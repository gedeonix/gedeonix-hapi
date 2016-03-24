'use strict';

/**
 * swagger - http://localhost:3000/swagger
 * swagger UI - http://localhost:3000/docs
 */

const pgk = require('./../../package.json');

const plugins = [

    { register: require('hapi-swaggered'), options: {
        tags: {
            'foobar/test': 'Example foobar description'
        },
        info: {
            title: 'Gedeonix Hapi API',
            description: '(c) Gedeonix.pl',
            version: pgk.version
        }
    }},

    { register: require('hapi-swaggered-ui'), options: {
        title: 'Gedeonix Hapi API',
        path: '/docs',
        authorization: {
            field: 'api_key',
            scope: 'query',
            // valuePrefix: 'bearer '// prefix incase
            //defaultValue: 'APIKEY',
            placeholder: 'Api Key'
        },
        //auth: 'simple',
        swaggerOptions: {

        }
    }}
];

exports.register = (server, options, next) => {

    server.register(plugins, (err) => {
        next();
    });
};

exports.register.attributes = {
    name: 'swagger-plugin',
    version: '0.0.1'
};
