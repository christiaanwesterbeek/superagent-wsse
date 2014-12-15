var should     = require('should');
var superagent = require('superagent');
var wsse       = require('../index');

var config = {
  username: '123',
  password: 'abc'
};

describe('superagent-wsse', function() {
  it('should add authorization header', function() {
    var req = superagent
    .get('http://example.com')
    .use(wsse(config));

    req.request()._headers
    .should
    .have.property('authorization', 'WSSE profile="UsernameToken"');
  });
  it('should add x-wsse header', function() {
    var req = superagent
    .get('http://example.com')
    .use(wsse(config));

    req.request()._headers
    .should
    .have.property('x-wsse')
    .and.be.a.String
    .and.match(/UsernameToken Username="123", PasswordDigest="[^"]+", Nonce="[^"]+", Created="[^"]+"/);
    //This is what it would really be at that point in time:
    //UsernameToken Username="123", PasswordDigest="WdkI0i9CQnNBIRDD3dnTnqwEUXw=", Nonce="Mjk0ZWY3M2ExZGFlM2E3NDUzZjE3ZThiNGJhYmE1OGZlYmIxMGZlYg==", Created="2014-12-15T19:15:14.181Z"
  });
});