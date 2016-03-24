'use strict';

const Joi = require('joi');
const User = require('./user-model');

exports.login = {

    tags: ['api'],
    description: 'User login',
    validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: (request, reply) => {

        User.authenticate()(request.payload.email, request.payload.password, (err, user, message) => {

            console.log(user);

            if (err) {
                console.error(err);
                return reply(err);
            }

            if (user) {
                console.log(user);

                const result = {
                    id: user._id,
                    email: user.email,
                    role: user.role.toString(),
                    company: user.company
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

exports.logout = {

    tags: ['api'],
    description: 'User logout',
    handler: (request, reply) => {

        request.cookieAuth.clear();
        return reply({ message: 'user logout' });
    }
};

exports.exists = {

    auth: false,
    handler: (request, reply) => {

        User.findOne({ email: request.params.user }, (err, user) => {

            console.log('(1) user=' + JSON.stringify(user));

            if (err) {
                reply.boom(500,'Problem to GET user info');
                return;
            }
            if (user === null) {
                reply({ message: 'The user is not registered in the system' });
            }
            else {
                reply.boom(404, 'The user is already registered in the system');
            }
        });
    }
};

exports.find = {

    auth: 'session', tags: ['api', 'admin', 'user'], description: 'Users list', notes: 'The return is a list of system users',
    plugins: { 'hapiAuthorization': { role: 'ADMIN' } },
    handler: (request, reply) => {

        const owner = request.auth.credentials.id;

        User.find({ /*owner: owner,*/ removed: { $exists: false } }, (err, data) => {

            if (!err) {
                return reply({ items: data, count: data.length });
            }
            return reply.badImplementation(err);
        });
    }
};

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
                return reply.badImplementation(err);
            });
    }

};

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

                    if (!err) {
                        return reply('Save');
                    }
                    console.log(err);
                    return reply.boom(403, 'Problem');
                });
            })
            .catch((err) => {
                return reply.badImplementation(err);
            });
    }

};


