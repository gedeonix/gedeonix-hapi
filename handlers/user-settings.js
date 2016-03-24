'use strict';

const Joi = require('joi');
const User = require('../models/user');

/**
 * GET
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
