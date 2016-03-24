'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    avatar: { type: String },

    created: { type: Date, default: Date.now },
    updated: { type: Date },
    removed: { type: Date },

    role: { type: String, required: true, default: 'USER' },
    description: { type: String, default: '', trim: true },
    team: { type: ObjectId, ref: 'Team' },

    settings : {

    }
});

schema.plugin(require('passport-local-mongoose'), {
    usernameField: 'email',
    hashField: 'password',
    usernameLowerCase: true
});

schema.pre('save', (next) => {
    this.updated = Date.now();
    next();
});

/*
schema.statics.findOneByUserId = function (userId, select, callback) {
    this.findOne({ '_id': id, removed: { $exists: false } }, select, null, callback);
}
*/

module.exports = mongoose.model('User', schema);
