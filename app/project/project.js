'use strict';

const Joi = require('joi');

const Project = require('./project-model');

/**
 * LIST
 */
exports.find = {

    auth: 'session', tags: ['api', 'project'], description: 'Get projects', notes: '...',
    handler: (request, reply) => {

        console.log('auth=' + JSON.stringify(request.auth));

        const owner = request.auth.credentials.id;

        Project.find({ owner: owner, removed: { $exists: false } }, (err, data) => {

            if (!err) {
                return reply({ items: data, count: data.length });
            }
            return reply.badImplementation(err);
        });
    }
};

/**
 * GET
 */
exports.findOne = {

    auth: 'session', tags: ['api', 'project'], description: 'Get project', notes: '...',
    validate: {
        params: {
            id: Joi.string().alphanum().required()
        }
    },
    handler: (request, reply) => {

        const owner = request.auth.credentials.id;
        const id = encodeURIComponent(request.params.id);

        Project.findOne({ owner: owner, '_id': id, removed: { $exists: false } }, (err, data) => {

            if (!err) {
                return reply(data);
            }
            return reply.badImplementation(err);
        });
    }

};

/**
 * CREATE
 */
exports.create = {

    auth: 'session', tags: ['api', 'project'], description: '...',
    validate: {
        payload: {
            name: Joi.string().required().description('Project name'),
            description: Joi.string(),
            state: Joi.string()
        }
    },
    handler: (request, reply) => {

        const project = new Project(request.payload);
        project.set('owner', request.auth.credentials.id);

        project.save((err, data) => {

            if (!err) {
                return reply('Save');
            }
            return reply.error('Problem');
        });
    }

};

/**
 * UPDATE
 */
exports.update = {

    auth: 'session', tags: ['api', 'project'], description: 'Edit project',
    validate: {
        payload: {
            _id: Joi.string(),
            name: Joi.string().required().description('Project name'),
            state: Joi.string(),
            owner: Joi.string(),
            __v: Joi.number().integer(),
            created: Joi.date(),
            updated: Joi.date()
        }
    },
    handler: (request, reply) => {

        const owner = request.auth.credentials.id;
        const id = encodeURIComponent(request.params.id);

        const model = request.payload;
        console.log('>>> model=' + JSON.stringify(model));


        Project.findOne({ owner: owner, '_id': id, removed: { $exists: false } }, (err, project) => {

            if (!err) {

                project.name = request.payload.name;
                project.state = request.payload.state;

                project.save((err) => {

                    if (!err) {
                        return reply('Save');
                    }
                    console.log(err);

                    return reply.info(err);
                });

            } else {
                return reply.badImplementation(err);
            }
        });
    }

};

/**
 * REMOVE
 */
exports.remove = {

    auth: 'session', tags: ['api', 'project'], description: '...',
    handler: (request, reply) => {

        const owner = request.auth.credentials.id;
        const id = encodeURIComponent(request.params.id);

        Project.findOne({ owner: owner, '_id': id, removed: { $exists: false } }, (err, project) => {

            if (!err) {

                project.removed = Date.now();

                project.save((err) => {

                    if (!err) {
                        return reply('Remove');
                    }
                    return reply.error('Problem');
                });

            } else {
                return reply.badImplementation(err);
            }
        });
    }

};




