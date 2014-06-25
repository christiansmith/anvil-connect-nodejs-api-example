var express = require('express')
  , anvil = require('anvil-connect-sdk')
  , server = express()
  ;


anvil.configure({
  provider: {
    uri:    'https://YOUR.AUTH.SERVER',
    key:     process.env.ANVIL_CONNECT_PUBLIC_KEY
  },
  client: {
    id:     'YOUR.CLIENT.ID',
    token:  'YOUR.CLIENT.JWT'
  },
  params: {
    redirectUri: 'NOT NEEDED FOR API'
  }
});

/**
 * Protect the entire server
 */

server.get('/', function (req, res, next) {
  res.send('public');
});

//server.use(anvil.verify({ scope: '' }))


/**
 * Or protect specific routes. Without options, the middleware
 * will require a valid access token in the request, per RFC6750.
 */

server.get('/widgets', anvil.verify(), function (req, res, next) {
  res.json(['x','y','z']);
});


/**
 * You can also require an access token to have a specific scope.
 */

var authorize = anvil.verify({
  scope: 'sprocket.read'
});

server.get('/sprockets', authorize, function (req, res, next) {
  res.json(['a','b','c']);
});


/**
 * Start the server
 */

server.listen(3003, function () {
  console.log('API protected by Anvil Connect on port 3003');
});
