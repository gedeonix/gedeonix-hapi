'use strict';

const mongoose = require('mongoose');
const nameValidator = require('../core/validators/name-validator');

const schema = mongoose.Schema({
    owner: { type: String, required: true },
    name: { type: String, required: true, validate: nameValidator, trim: true },
    state: { type: String },
    description: { type: String },

    created: { type: Date, default: Date.now },
    updated: { type: Date },
    removed: { type: Date }
});

schema.pre('save', (next) => {
    this.updated = Date.now();
    next();
});

module.exports = mongoose.model('Project', schema);
