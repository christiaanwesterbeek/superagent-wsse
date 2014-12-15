superagent-wsse [![Build Status](https://travis-ci.org/devotis/superagent-wsse.svg)](https://travis-ci.org/devotis/superagent-wsse)
===============

A [superagent](https://github.com/visionmedia/superagent) plugin that generates headers for WSSE authentication.

##Install##
Install with [npm](http://github.com/isaacs/npm)

```
npm install superagent-wsse
```

##Usage##

```javascript
var request = require('superagent');
var wsse    = require('superagent-wsse');

var config = {
  username: '123',
  password: 'abc'
};

request
.get('http://example.com')
.use(wsse(config));
.end(function(res) {
  console.log(res.text);
});
```

##About WSSE##
WSSE is a family of open security specifications for web services, specifically SOAP web services. However, the Username Token algorithm is not SOAP-specific; it can be easily adapted to work within the HTTP authentication framework.

An HTTP request to a backend that uses WSSE authentication.
```
GET /api/things HTTP/1.1

Authorization: WSSE profile="UsernameToken"
X-WSSE: UsernameToken Username="...", PasswordDigest="...", Nonce="...", Created="..."
```
