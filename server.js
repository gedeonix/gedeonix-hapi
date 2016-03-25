'use strict';

const Hapi = require('hapi');

const internals = {};

const server = new Hapi.Server({
    debug: { request: ['error'] }
});

server.connection({
    port: parseInt(process.env.PORT, 10) || 3000,
    labels: ['api']
});

const plugins = [
    { register: require('good'),
        options: {
            responsePayload: true,
            reporters: [
                { reporter: require('good-console'), events: { log: '*', request: '*' } },
                { reporter: require('good-file'), events: { log: 'debug' }, config: 'log/debug_log.log'},
                { reporter: require('good-file'), events: { log: 'error' }, config: 'log/error_log.log'}
            ]
        }
    },
    { register: require('./app/mongo'),
        options: { uri: 'mongodb://localhost/gedeonix-hapi', mongoose: { debug: true } }
    },
    require('inert'),
    require('vision'),
    require('./app/decorator'),
    require('./app/auth'),
    require('./app/swagger'),
    require('./app/route')
];
server.register(plugins, (err) => {

    if (err) {
        throw err;
    }

    server.start(() => {

        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

exports.server = server;

