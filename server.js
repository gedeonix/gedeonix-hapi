'use strict';

const Path = require('path');
const Good = require('good');
const Hapi = require('hapi');

const routes = require('./routes');

const internals = {};

const server = new Hapi.Server({
    debug: { request: ['error'] }
});

server.connection({
    port: parseInt(process.env.PORT, 10) || 3000,
    labels: ['api']
});

const plugins = [
    { register: Good,
        options: {
            responsePayload: true,
            reporters: [
                {
                    reporter: require('good-console'),
                    events: { log: '*', response: '*', error: '*' }
                }
            ]
        }
    },
    { register: require('./plugins/mongo-plugin'),
        options: {
            uri: 'mongodb://localhost/gedeonix-hapi',
            mongoose: {
                debug: true
            }
        }
    },
    require('inert'),
    require('vision'),
    require('./plugins/decorator-plugin'),
    require('./plugins/auth-plugin'),
    require('./plugins/swagger-plugin')
];
server.register(plugins, (err) => {

    if (err) {
        throw err;
    }

    server.route(routes);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'public')
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/test',
        handler: (request, reply) => {

            return reply('Ok!');
        }
    });

    server.start(() => {

        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

exports.server = server;

