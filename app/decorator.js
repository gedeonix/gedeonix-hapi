'use strict';

const Boom = require('boom');

exports.register = (server, options, next) => {

    server.decorate('reply', 'success', function (message) {

        const msg = message || 'OK';
        return this.response({ statusCode: 200, message: msg });
    });

    server.decorate('reply', 'error', function (err) {

        return this.response(Boom.wrap(err, 403));
    });

    server.decorate('reply', 'notFound', function (message) {

        return this.response(Boom.notFound(message));
    });

    next();
};

exports.register.attributes = {
    name: 'decorator-plugin',
    version: '0.0.1'
};
