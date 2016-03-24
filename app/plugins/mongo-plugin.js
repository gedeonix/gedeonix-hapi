'use strict';

const bluebird = require('bluebird');
const mongoose = bluebird.promisifyAll(require('mongoose'));

exports.register = (plugin, options, next) => {

    mongoose.connect(options.uri, options.mongoose, (error) => {

        if (error) {

            plugin.log(['error', 'database', 'mongodb'], 'Unable to connect to MongoDB: ' + error.message);
            process.exit();
        }

        mongoose.connection.once('open', () => {

            plugin.log(['info', 'database', 'mongodb'], 'Mongo connected to ' +  options.uri);
        });

        mongoose.connection.on('connected', () => {

            plugin.log(['info', 'database', 'mongodb'], 'Mongo connected to ' +  options.uri);
        });

        mongoose.connection.on('error', (err) => {

            plugin.log(['error', 'database', 'mongodb'], 'Mongo ' + err.message);
        });

        mongoose.connection.on('disconnected', () => {

            plugin.log(['warn', 'database', 'mongodb'], 'Mongo was disconnected');
        });
    });

    return next();
};

exports.register.attributes = {
    name: 'mongo-plugin',
    version: '0.0.1'
};
