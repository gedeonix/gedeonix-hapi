'use strict';

const Joi = require('joi');
const User = require('../models/user');
const Team = require('../models/team');

exports.register = {

    auth: false,
    validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        }
    },
    handler: (request, reply) => {

        const newUser = new User({
            email: request.payload.email
        });

        User.register(newUser, request.payload.password, (err, user) => {

            if (err) {
                return reply(err);
            }

            const newTeam = new Team();
            newTema.owner = user._id;
            newTeam.name = 'Test Team';
            newCompany.save((err, data) => {

                if (!err) {

                    user.team = data._id;
                    user.save();

                    return reply('successfully registered');
                }
                console.log(err);
                return reply.boom(403, 'Problem');
            });

        });
    }
};

