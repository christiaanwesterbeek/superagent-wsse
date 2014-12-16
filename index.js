var crypto  = require('crypto');
function uuid(a)       {return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid);}//https://gist.github.com/jed/982883
function sha1(a)       {return crypto.createHash('sha1').update(a).digest('hex');}
function sha1Base64(a) {return crypto.createHash('sha1').update(a).digest('base64');}
function base64(a)     {return new Buffer(a).toString('base64');}

function createWSSEHeader(config) {
  var o = {
    nonce          : sha1(uuid()), //make next nonce less guessable by doing sha1 of the uuid generated
    username       : config.username,
    password       : config.password,
    timestamp      : new Date().toISOString()
  };
  o.password_digest = sha1Base64(o.nonce + o.timestamp + o.password);

  return (
    'UsernameToken '  +
    'Username="'      + o.username        + '", '+
    'PasswordDigest="'+ o.password_digest + '", '+
    'Nonce="'         + base64(o.nonce)   + '", '+
    'Created="'       + o.timestamp       + '"');
}

module.exports = function(config) {
  config = config || {};

  return function (request) {
    request.set('Authorization', 'WSSE profile="UsernameToken"');
    request.set('X-WSSE',        createWSSEHeader(config));
    request.set('Accept',        'application/json');

    return request;
  };
};