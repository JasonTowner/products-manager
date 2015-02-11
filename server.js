"use-strict";

var Hapi = require('hapi'),
    Router = require('./init/router');

var port = parseInt(process.env.PORT || 11000);
var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: port
});

var mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/products-management';

server.route(Router.routes);

var plugins = [
    {register: require('lout')},
    {
        register: require('hapi-mongoose-db-connector'),
        options: {
            mongodbUrl: mongoUri
        }
    }
];

server.register(plugins, function (err) {
    if (err) {
        throw err;
    }

    server.start(function () {
        console.log('Hapi server started at: ' + server.info.uri);
    })
});