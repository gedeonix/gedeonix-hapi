'use strict';

const Faker = require('faker');
Faker.locale = 'pl';

const Project = require('./project/project');
const Team = require('./team/team');

exports.project = {

    auth: 'session',
    handler: (req, reply) => {

        const project = new Project();
        project.name = Faker.company.companyName();

        project.save((err, data) => {

            if (err) {
                return reply.error(err);
            }
            return reply(data);
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

            if (err) {
                return reply.error(err);
            }
            return reply(data);
        });
    }
};

//POPULATE - only to test
exports.routes = [
    { method: 'GET', path: '/api/populate/team', config: exports.team },
    { method: 'GET', path: '/api/populate/project', config: exports.project }
];


