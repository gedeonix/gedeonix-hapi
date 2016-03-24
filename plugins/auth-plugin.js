'use strict';

const plugins = [
    {
        register: require('hapi-authorization'),
        options: {
            roles: false
        }
    },
    require('hapi-auth-cookie')
];

exports.register = (server, options, next) => {

    server.register(plugins, () => {

        server.auth.strategy('session', 'cookie', {
            password: 'secret',
            cookie: 'session',
            //redirectTo: '/auth',              //redirect if no session
            isSecure: false,                    //should be set to true in production
            ttl: 30 * 60 * 1000
        });

        console.log(server.info.uri);

        next();

    });
};

exports.register.attributes = {
    name: 'auth-plugin',
    version: '0.0.1'
};
