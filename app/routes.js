'use strict';

const User = require('./user/user');
const Register = require('./user/register');
const Team = require('./team/team');
const Project = require('./project/project');

const Populate = require('./populate');

module.exports = [

    //USER
    { method: 'POST', path: '/api/login', config: User.login },
    { method: 'GET', path: '/api/logout', config: User.logout },
    { method: 'POST', path: '/api/register', config: Register.register },
    { method: 'GET', path: '/api/user', config: User.find },
    { method: 'GET', path: '/api/user/exists', config: User.exists },
    { method: 'GET', path: '/api/settings/user', config: User.get },
    { method: 'PUT', path: '/api/settings/user', config: User.update },

    //TEAM
    { method: 'GET', path: '/api/settings/team', config: Team.get },
    { method: 'PUT', path: '/api/settings/team/main', config: Team.updateMain },
    { method: 'PUT', path: '/api/settings/team/other', config: Team.updateOther },

    //PROJECT
    { method: 'GET', path: '/api/project', config: Project.find },
    { method: 'GET', path: '/api/project/{id}', config: Project.findOne },
    { method: 'POST', path: '/api/project', config: Project.create },
    { method: 'PUT', path: '/api/project/{id}', config: Project.update },
    { method: 'DELETE', path: '/api/project/{id}', config: Project.remove },

    //POPULATE - only to test
    { method: 'GET', path: '/api/populate/team', config: Populate.team },
    { method: 'GET', path: '/api/populate/project', config: Populate.project }
];
