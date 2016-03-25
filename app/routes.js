'use strict';

const UserService = require('./user/user-service');
const TeamService = require('./team/team-service');
const ProjectService = require('./project/project-service');
const PopulateService = require('./populate/populate-service');

module.exports = [

    //USER
    { method: 'POST', path: '/api/login', config: UserService.login },
    { method: 'GET', path: '/api/logout', config: UserService.logout },
    { method: 'POST', path: '/api/register', config: UserService.register },
    { method: 'GET', path: '/api/user', config: UserService.find },
    { method: 'GET', path: '/api/user/exists/{email}', config: UserService.exists },
    { method: 'GET', path: '/api/settings/user', config: UserService.get },
    { method: 'PUT', path: '/api/settings/user', config: UserService.update },

    //TEAM
    { method: 'GET', path: '/api/settings/team', config: TeamService.get },
    { method: 'PUT', path: '/api/settings/team/main', config: TeamService.updateMain },
    { method: 'PUT', path: '/api/settings/team/other', config: TeamService.updateOther },

    //PROJECT
    { method: 'GET', path: '/api/project', config: ProjectService.find },
    { method: 'GET', path: '/api/project/{id}', config: ProjectService.findOne },
    { method: 'POST', path: '/api/project', config: ProjectService.create },
    { method: 'PUT', path: '/api/project/{id}', config: ProjectService.update },
    { method: 'DELETE', path: '/api/project/{id}', config: ProjectService.remove },

    //POPULATE - only to test
    { method: 'GET', path: '/api/populate/team', config: PopulateService.team },
    { method: 'GET', path: '/api/populate/project', config: PopulateService.project }
];
