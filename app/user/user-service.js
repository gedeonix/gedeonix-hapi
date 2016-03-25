'use strict';

const Joi = require('joi');

const User = require('./user');

/**
 * Register
 */
exports.register = {

    auth: false,
    tags: ['api'],
    description: 'User register',
    validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        }
    },
    handler: (request, reply) => {

        const newUser = new User({
            email: request.payload.email
        });

        User.register(newUser, request.payload.password, (err, user) => {

            if (err) {
                return reply.error(err);
            }
            return reply.success('Successfully registered');
        });
    }
};

/**
 * Login
 */
exports.login = {

    tags: ['api'],
    description: 'User login',
    validate: {
        payload: {
            email: Joi.string().email().required()
        }
    },
    handler: (request, reply) => {

        User.authenticate()(request.payload.email, request.payload.password, (err, user, message) => {

            if (err) {
                return reply.error(err);
            }

            if (user) {

                const result = {
                    id: user._id,
                    email: user.email,
                    role: user.role.toString()
                };

                request.cookieAuth.set(result); //add user to session
                return reply(result);
            }
            return reply(message);

        });
    },
    auth: {
        mode: 'try', strategy: 'session'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false
        }
    }
};

/**
 * Logout
 */
exports.logout = {

    tags: ['api'],
    description: 'User logout',
    handler: (request, reply) => {

        request.cookieAuth.clear();
        return reply.success('User logout');
    }
};

/**
 * Exists
 */
exports.exists = {

    auth: false,
    tags: ['api'],
    description: 'User exist',
    validate: {
        params: {
            email: Joi.string().email().required()
        }
    },
    handler: (request, reply) => {

        const email = request.params.email;

        User.findOne({ email: email }, (err, user) => {

            if (err) {
                return reply.error(err);
            }
            if (user === null) {
                return reply.notFound('The user is not already registered in the system');
            }
            reply.success('The user is registered in the system');
        });
    }
};

/**
 * Find
 */
exports.find = {

    auth: 'session',
    tags: ['api', 'admin', 'user'],
    description: 'Users list',
    notes: 'The return is a list of system users',
    plugins: { 'hapiAuthorization': { role: 'ADMIN' } },
    handler: (request, reply) => {

        const owner = request.auth.credentials.id;

        User.find({/*owner: owner,*/ removed: { $exists: false } }, (err, data) => {

            if (err) {
                return reply.error(err);
            }

            return reply({ items: data, count: data.length });
        });
    }
};

/**
 * Get
 */
exports.get = {

    auth: 'session', tags: ['api', 'settings'], description: 'Get user settings', notes: '...',
    handler: (request, reply) => {

        const owner = request.auth.credentials.id;

        User.findOne({ '_id': owner, removed: { $exists: false } })
            .select('_id __v email firstName lastName description settings')
            .execAsync().then((data) => {
                return reply(data);
            })
            .catch((err) => {
                return reply.error(err);
            });
    }

};

/**
 * Update
 */
exports.update = {

    auth: 'session', tags: ['api', 'settings'], description: '...',
    validate: {
        payload: {
            __v: Joi.number().integer().required(),
            _id: Joi.string().required(),
            email: Joi.string().email().required(),
            firstName: Joi.string().description('First name'),
            lastName: Joi.string().description('Last name'),
            description: Joi.string().description('Description')
        }
    },
    handler: (request, reply) => {

        const owner = request.auth.credentials.id;
        const model = request.payload;
        console.log('>>> model=' + JSON.stringify(model));

        User.findOne({ '_id': owner, removed: { $exists: false } }).execAsync()
            .then((data) => {

                data.firstName = request.payload.firstName;
                data.lastName = request.payload.lastName;
                data.description = request.payload.description;

                data.save((err) => {

                    if (err) {
                        return reply.error(err);
                    }
                    return reply.success();
                });
            })
            .catch((err) => {
                return reply.error(err);
            });
    }
};

exports.routes = [
    { method: 'POST', path: '/api/login', config: exports.login },
    { method: 'GET', path: '/api/logout', config: exports.logout },
    { method: 'POST', path: '/api/register', config: exports.register },
    { method: 'GET', path: '/api/user', config: exports.find },
    { method: 'GET', path: '/api/user/exists/{email}', config: exports.exists },
    { method: 'GET', path: '/api/settings/user', config: exports.get },
    { method: 'PUT', path: '/api/settings/user', config: exports.update }
];



