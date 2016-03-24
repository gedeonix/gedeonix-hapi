'use strict';

const mongoose = require('mongoose');
const validate = require('mongoose-validator');

module.exports = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'The name should be {ARGS[0]} to {ARGS[1]} characters'
    })
];
