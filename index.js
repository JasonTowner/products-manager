"use-strict";

var Hapi = require('hapi'),
  Router = require('./init/router');

var port = 3000;
var server = new Hapi.Server('localhost', port);

var mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/products-management';

server.route(Router.routes);

var plugins = [
  { plugin: require('good') },
  { plugin: require('lout') },
  {
    plugin: require('hapi-mongoose-db-connector'),
    options: {
      mongodbUrl: mongoUri
    }
  }
];

server.pack.register(plugins, function (err) {
  if (err) {
    throw err;
  }

  server.start(function () {
    console.log('Hapi server started at: ' + server.info.uri);
  })
});