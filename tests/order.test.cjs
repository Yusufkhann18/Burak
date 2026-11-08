const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Types } = require('mongoose');
const OrderService = require('../dist/model/Order.service').default;
const orderController = require('../dist/controllers/order.controller').default;
const router = require('../dist/router').default;
const memberController = require('../dist/controllers/member.controller').default;
const member = { _id: new Types.ObjectId() };
const productId = new Types.ObjectId();
const orderId = new Types.ObjectId();
const query = value => ({ exec: async () => value });

test('creation rejects malformed and empty carts before writing', async () => {
  const service = new OrderService();
  for (const input of [null, [], {}, [{ productId: 'bad', itemQuantity: 1 }],
    [{ productId: String(productId), itemQuantity: -1 }]]) {
    await assert.rejects(service.createOrder(member, input), error => error.code === 400);
  }
});

test('creation uses catalogue prices, combines duplicate items and ignores client order IDs', async () => {
  const service = new OrderService();
  let saved, items;
  service.productModel = { find: () => query([
    { _id: productId, productPrice: 20, productLeftCount: 10 },
  ]) };
  service.orderModel = { create: async input => (saved = { ...input, _id: orderId }) };
  service.orderItemModel = { insertMany: async input => { items = input; } };
  await service.createOrder(member, [
    { productId: String(productId), itemQuantity: 2, itemPrice: 0, orderId: 'ignored' },
    { productId: String(productId), itemQuantity: 1, itemPrice: 0 },
  ]);
  assert.equal(saved.orderTotal, 65);
  assert.equal(saved.orderDelivery, 5);
  assert.equal(items.length, 1);
  assert.equal(items[0].itemPrice, 20);
  assert.equal(items[0].itemQuantity, 3);
  assert.equal(items[0].orderId, orderId);
});

test('failed item writes remove partial items and their order', async () => {
  const service = new OrderService();
  const cleanup = [];
  service.productModel = { find: () => query([
    { _id: productId, productPrice: 100, productLeftCount: 1 },
  ]) };
  service.orderModel = {
    create: async () => ({ _id: orderId }),
    deleteOne: filter => ({ exec: async () => cleanup.push(['order', filter._id]) }),
  };
  service.orderItemModel = {
    insertMany: async () => { throw new Error('write failed'); },
    deleteMany: filter => ({ exec: async () => cleanup.push(['items', filter.orderId]) }),
  };
  await assert.rejects(service.createOrder(member, [
    { productId: String(productId), itemQuantity: 1 },
  ]), error => error.code === 400);
  assert.deepEqual(cleanup, [['items', orderId], ['order', orderId]]);
});

test('listing validates pagination, scopes to the owner and looks up actual collections', async () => {
  const service = new OrderService();
  await assert.rejects(service.getMyOrders(member, { page: 0, limit: 10 }), e => e.code === 400);
  await assert.rejects(service.getMyOrders(member, { page: 1, limit: 101 }), e => e.code === 400);
  await assert.rejects(service.getMyOrders(member, { page: 1, limit: 10, orderStatus: 'BAD' }), e => e.code === 400);
  let pipeline;
  service.orderModel = { aggregate: input => { pipeline = input; return query([]); } };
  service.orderItemModel = { collection: { name: 'orderItem' } };
  service.productModel = { collection: { name: 'products' } };
  assert.deepEqual(await service.getMyOrders(member, { page: 2, limit: 10 }), []);
  assert.equal(pipeline[0].$match.memberId, member._id);
  assert.equal(pipeline[2].$skip, 10);
  assert.equal(pipeline[4].$lookup.from, 'orderItem');
});

test('concurrent PROCESS requests award one point and terminal states cannot reopen', async () => {
  const service = new OrderService();
  let status = 'PAUSE', points = 0;
  service.orderModel = {
    findOne: filter => {
      assert.equal(filter.memberId, member._id);
      return query({ _id: orderId, orderStatus: status });
    },
    findOneAndUpdate: (filter, update) => ({ exec: async () => {
      if (filter.orderStatus !== status) return null;
      status = update.$set.orderStatus;
      return { _id: orderId, orderStatus: status };
    } }),
  };
  service.memberService = { addUserPoint: async (_, point) => { points += point; } };
  const input = { orderId: String(orderId), orderStatus: 'PROCESS' };
  const results = await Promise.allSettled([
    service.updateOrder(member, input), service.updateOrder(member, input),
  ]);
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 1);
  await service.updateOrder(member, input);
  assert.equal(points, 1);
  await service.updateOrder(member, { ...input, orderStatus: 'FINISH' });
  await assert.rejects(service.updateOrder(member, input), e => e.code === 400);
});

test('another member cannot update an order that is not returned by the owner filter', async () => {
  const service = new OrderService();
  service.orderModel = { findOne: filter => {
    assert.equal(filter.memberId, member._id);
    return query(null);
  } };
  await assert.rejects(service.updateOrder(member, {
    orderId: String(orderId), orderStatus: 'PROCESS',
  }), e => e.code === 404);
});

test('all order routes require authentication', async () => {
  for (const path of ['/order/create', '/order/all', '/order/update']) {
    const route = router.stack.find(layer => layer.route?.path === path).route;
    assert.equal(route.stack[0].handle, memberController.verifyAuth);
    let status, proceeded = false;
    const res = { status(code) { status = code; return this; }, json() {} };
    await route.stack[0].handle({ cookies: {}, headers: {} }, res, () => { proceeded = true; });
    assert.equal(status, 401);
    assert.equal(proceeded, false);
  }
});

test('list controller defaults to page 1 / limit 10 and responds with 200', async () => {
  const original = OrderService.prototype.getMyOrders;
  OrderService.prototype.getMyOrders = async (_, inquiry) => {
    assert.deepEqual(inquiry, { page: 1, limit: 10, orderStatus: undefined });
    return [];
  };
  try {
    let status, body;
    const res = { status(code) { status = code; return this; }, json(data) { body = data; } };
    await orderController.getMyOrders({ member, query: {} }, res);
    assert.equal(status, 200);
    assert.deepEqual(body, []);
  } finally { OrderService.prototype.getMyOrders = original; }
});
