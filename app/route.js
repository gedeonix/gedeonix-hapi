'use strict';

const Path = require('path');

const UserService = require('./user/user-service');
const TeamService = require('./team/team-service');
const ProjectService = require('./project/project-service');

const Populate = require('./populate');

exports.register = (server, options, next) => {

    server.route(UserService.routes);
    server.route(TeamService.routes);
    server.route(ProjectService.routes);
    server.route(Populate.routes);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '..', 'public')
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/test',
        handler: (request, reply) => {

            return reply('Ok!');
        }
    });

    next();
};

exports.register.attributes = {
    name: 'route-plugin',
    version: '0.0.1'
};

