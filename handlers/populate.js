'use strict';

const Faker = require('faker');
Faker.locale = 'pl';

const Project = require('../models/project');
const Team = require('../models/team');

exports.project = {

    auth: 'session',
    handler: (req, reply) => {

        const project = new Project();
        project.name = Faker.company.companyName();

        project.save((err, data) => {

            if (!err) {
                return reply(data);
            }
            return reply.badImplementation(err);
        });
    }
};

exports.team = {

    auth: 'session',
    handler: (req, reply) => {

        //const owner = request.auth.credentials.id;

        const team = new Team();
        team.name = Faker.company.companyName();
        team.description = Faker.catchPhrase;

        team.save((err, data) => {

            if (!err) {
                return reply(data);
            }
            return reply.badImplementation(err);
        });
    }
};

