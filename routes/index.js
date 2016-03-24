'use strict';

const User = require('../handlers/user');
const Register = require('../handlers/register');
const UserSettings = require('../handlers/user-settings');
const TeamSettings = require('../handlers/team-settings');
const Project = require('../handlers/project');

const Populate = require('../handlers/populate');

module.exports = [

    //USER
    { method: 'POST', path: '/api/login', config: User.login },
    { method: 'GET', path: '/api/logout', config: User.logout },
    { method: 'POST', path: '/api/register', config: Register.register },
    { method: 'GET', path: '/api/user', config: User.find },
    { method: 'GET', path: '/api/user/exists', config: User.exists },

    //USER SETTINGS
    { method: 'GET', path: '/api/settings/user', config: UserSettings.get },
    { method: 'PUT', path: '/api/settings/user', config: UserSettings.update },

    //TEAM SETTINGS
    { method: 'GET', path: '/api/settings/team', config: TeamSettings.get },
    { method: 'PUT', path: '/api/settings/team/main', config: TeamSettings.updateMain },
    { method: 'PUT', path: '/api/settings/team/other', config: TeamSettings.updateOther },

    //PROJECT
    { method: 'GET', path: '/api/project', config: Project.find },
    { method: 'GET', path: '/api/project/{id}', config: Project.findOne },
    { method: 'POST', path: '/api/project', config: Project.create },
    { method: 'PUT', path: '/api/project/{id}', config: Project.update },
    { method: 'DELETE', path: '/api/project/{id}', config: Project.remove },

    //POPULATE - only in test
    { method: 'GET', path: '/api/populate/team', config: Populate.team },
    { method: 'GET', path: '/api/populate/project', config: Populate.project }
];


