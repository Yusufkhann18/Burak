const { test } = require('node:test');
const assert = require('node:assert/strict');
const { extractAccessToken } = require('../dist/libs/utils/auth-token');
const { clientCors } = require('../dist/libs/utils/client-cors');
const controller = require('../dist/controllers/member.controller').default;
const AuthService = require('../dist/model/Auth.service').default;
const MemberService = require('../dist/model/Member.service').default;

test('Bearer token takes precedence and cookies remain supported', () => {
  assert.equal(extractAccessToken({ headers: { authorization: 'bEaReR mobile   ' }, cookies: { accessToken: 'web' } }), 'mobile');
  assert.equal(extractAccessToken({ headers: {}, cookies: { accessToken: 'web' } }), 'web');
  assert.equal(extractAccessToken({ headers: {} }), undefined);
  assert.equal(extractAccessToken({ headers: {}, cookies: { accessToken: {} } }), undefined);
});

test('both auth middleware recognize Bearer tokens', async () => {
  const original = AuthService.prototype.checkAuth;
  const member = { _id: 'member-id' };
  AuthService.prototype.checkAuth = async token => {
    assert.equal(token, 'mobile');
    return member;
  };
  try {
    for (const name of ['verifyAuth', 'retrieveAuth']) {
      const req = { headers: { authorization: 'Bearer mobile' } };
      let nextCalled = false;
      await controller[name](req, {}, () => { nextCalled = true; });
      assert.equal(req.member, member);
      assert.equal(nextCalled, true);
    }
  } finally { AuthService.prototype.checkAuth = original; }
});

test('signup accepts uploaded pictures and still accepts JSON profiles', async () => {
  const signup = MemberService.prototype.signup;
  const createToken = AuthService.prototype.createToken;
  const received = [], statuses = [];
  MemberService.prototype.signup = async input => { received.push(input); return input; };
  AuthService.prototype.createToken = async () => 'test-token';
  const res = { cookie() {}, status(code) { statuses.push(code); return this; }, json() {} };
  try {
    await controller.signup({ body: { memberNick: 'photo' }, file: { path: 'uploads\\members\\photo.png' } }, res);
    await controller.signup({ body: { memberNick: 'json', memberImage: 'existing.png' } }, res);
    assert.equal(received[0].memberImage, 'uploads/members/photo.png');
    assert.equal(received[1].memberImage, 'existing.png');
    assert.deepEqual(statuses, [201, 201]);
  } finally {
    MemberService.prototype.signup = signup;
    AuthService.prototype.createToken = createToken;
  }
});

test('CORS permits only the configured origin and handles preflight', () => {
  const run = (origin, method) => {
    const headers = {};
    let ended = false;
    const res = {
      setHeader(key, value) { headers[key.toLowerCase()] = value; },
      getHeader(key) { return headers[key.toLowerCase()]; },
      end() { ended = true; },
    };
    clientCors('https://client.example')({ method, headers: { origin, 'access-control-request-method': 'POST' } }, res, () => {});
    return { headers, ended, status: res.statusCode };
  };
  const allowed = run('https://client.example', 'OPTIONS');
  assert.equal(allowed.headers['access-control-allow-origin'], 'https://client.example');
  assert.equal(allowed.headers['access-control-allow-credentials'], 'true');
  assert.equal(allowed.status, 204);
  assert.equal(allowed.ended, true);
  const other = run('https://other.example', 'GET');
  assert.notEqual(other.headers['access-control-allow-origin'], 'https://other.example');
});

test('CORS does not reflect arbitrary origins when unconfigured', () => {
  const headers = {};
  clientCors('')({ method: 'GET', headers: { origin: 'https://other.example' } }, {
    setHeader(key, value) { headers[key.toLowerCase()] = value; },
    getHeader(key) { return headers[key.toLowerCase()]; },
  }, () => {});
  assert.equal(headers['access-control-allow-origin'], undefined);
});
