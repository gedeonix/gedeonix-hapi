'use strict';

const Boom = require('boom');

exports.register = (server, options, next) => {

    server.decorate('reply', 'notFound', (message) => {

        return this.response(Boom.notFound(message));
    });

    server.decorate('reply', 'badImplementation', (message) => {

        return this.response(Boom.badImplementation(message));
    });

    server.decorate('reply', 'unauthorized', (message) => {

        return this.response(Boom.unauthorized(message));
    });

    server.decorate('reply', 'info', (message) => {

        return this.response(Boom.create(400,message));
    });

    server.decorate('reply', 'error', (message) => {

        return this.response(Boom.create(403,message));
    });

    server.decorate('reply', 'boom', (status, message) => {

        return this.response(Boom.create(status,message));
    });

    next();
};

exports.register.attributes = {
    name: 'decorator-plugin',
    version: '0.0.1'
};
