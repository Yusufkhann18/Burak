const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const ejs = require('ejs');

test('product form can reopen after cancellation and validates its collection', () => {
  const handlers = {}, styles = {};
  const values = {
    '.product-name': 'Dish', '.product-price': '10', '.product-left-count': '5',
    '.product-collection': '', '.product-desc': 'Description', '.product-status': 'PROCESS',
  };
  const $ = selector => {
    if (typeof selector === 'function') return selector();
    return {
      on(event, callback) { handlers[`${selector}:${event}`] = callback; },
      val() { return values[selector]; },
      slideToggle() {},
      css(key, value) { styles[`${selector}:${key}`] = value; },
    };
  };
  const context = { $, console: { log() {} }, alert() {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('src/public/js/products.js', 'utf8'), context);
  handlers['#process-btn:click']();
  assert.equal(styles['#process-btn:display'], 'none');
  handlers['#cancel-btn:click']();
  assert.equal(styles['#process-btn:display'], 'flex');
  assert.equal(context.validateForm(), false);
  values['.product-collection'] = 'DISH';
  assert.equal(context.validateForm(), true);
});

test('product template retains Uzbek labels and cancel does not submit', () => {
  const filename = path.resolve('src/views/products.ejs');
  const html = ejs.render(fs.readFileSync(filename, 'utf8'), { products: [], member: {} }, { filename });
  assert.match(html, /Mahsulot nomi/);
  assert.match(html, /type="button"[^>]*id="cancel-btn"/);
  assert.match(html, /Bekor qilish/);
});

test('member upload adapter accepts both source and existing field names', () => {
  const router = require('../dist/router').default;
  const route = router.stack.find(layer => layer.route?.path === '/member/update').route;
  const adapter = route.stack[2].handle;
  for (const field of ['memberImage', 'MemberImage']) {
    const file = { path: 'uploads/members/example.png' };
    const req = { files: { [field]: [file] } };
    let nextCalled = false;
    adapter(req, {}, () => { nextCalled = true; });
    assert.equal(req.file, file);
    assert.equal(nextCalled, true);
  }
});

test('product create and update normalize Windows image paths', async () => {
  const ProductService = require('../dist/model/Product.service').default;
  const controller = require('../dist/controllers/product.controller').default;
  const create = ProductService.prototype.createNewProduct;
  const update = ProductService.prototype.updateChosenProduct;
  const res = { status() { return this; }, json() {}, send() {} };
  const savedImages = [];
  const check = input => {
    savedImages.push(input.productImages);
    return input;
  };
  ProductService.prototype.createNewProduct = async input => check(input);
  ProductService.prototype.updateChosenProduct = async (_, input) => check(input);
  try {
    const req = () => ({ body: {}, params: { id: '123' }, files: [{ path: 'uploads\\products\\image.png' }] });
    await controller.createNewProduct(req(), res);
    await controller.updateChosenProduct(req(), res);
    assert.deepEqual(savedImages, [
      ['uploads/products/image.png'], ['uploads/products/image.png'],
    ]);
  } finally {
    ProductService.prototype.createNewProduct = create;
    ProductService.prototype.updateChosenProduct = update;
  }
});
