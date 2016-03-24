'use strict';

const Joi = require('joi');

const Team = require('../models/team');

/**
 * GET
 */
exports.get = {

    auth: 'session', tags: ['api', 'settings'], description: 'Get Team settings', notes: '...',
    handler: (request, reply) => {

        const team = request.auth.credentials.team;
        const owner = request.auth.credentials.id;

        console.log(request.auth.credentials);

        //TODO

        Team.findOne({ '_id': company, 'owner': owner, removed: { $exists: false } })
            .execAsync().then((data) => {
                return reply(data);
            })
            .catch((err) => {
                return reply.badImplementation(err);
            });
    }

};

exports.updateMain = {
    auth: 'session', tags: ['api', 'settings'], description: 'Edit main team settings',
    validate: {
        payload: {
            __v: Joi.number().integer().required(),
            _id: Joi.string().required(),
            name: Joi.string(),
            description: Joi.string().allow('')
        }
    },
    handler: (request, reply) => {

        const company = request.auth.credentials.company;
        const owner = request.auth.credentials.id;

        const model = request.payload;
        console.log('>>> model=' + JSON.stringify(model));

        Company.findOne({ '_id': team, 'owner': owner, removed: { $exists: false } })
            .execAsync().then((data) => {

                data.name = request.payload.name;
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

exports.updateOther = {
    auth: 'session', tags: ['api', 'settings'], description: 'Edycja other team settings',
    handler: (request, reply) => {

        return reply.boom(404, 'No implements');
    }
};
