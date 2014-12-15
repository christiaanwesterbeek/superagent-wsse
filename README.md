superagent-wsse
===============

A superagent plugin that generates headers for WSSE authentication

##About WSSE##
WSSE is a family of open security specifications for web services, specifically SOAP web services. However, the Username Token algorithm is not SOAP-specific; it can be easily adapted to work within the HTTP authentication framework.

An HTTP request to a backend that uses WSSE authentication.
```
GET /api/things HTTP/1.1

Authorization: WSSE profile="UsernameToken"
X-WSSE: UsernameToken Username="...", PasswordDigest="...", Nonce="...", Created="..."
```
