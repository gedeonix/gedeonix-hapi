'use strict';

const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const nameValidator = [
    validate({ validator: 'isLength', arguments: [3, 50], message: 'The name should be {ARGS[0]} to {ARGS[1]} characters' })
];

const taxIdentificationNumberValidator = {

    validator: (val) => {
        if (val) {
            var nip = val.replace(/\-/g, '');
            if (nip.length === 10) {

                var i;
                for (i = 0; i < 10; i++) {
                    if (isNaN(nip[i])) {
                        return false;
                    }
                }
                var sum = (6 * nip[0] + 5 * nip[1] + 7 * nip[2] + 2 * nip[3] + 3 * nip[4] + 4 * nip[5] + 5 * nip[6] + 6 * nip[7] + 7 * nip[8]) % 11;
                if (Number(nip[9]) === sum) {
                    return true;
                }
            }
        }
        return false;
    },
    message: 'Tax Identification Number has the wrong format',
    errorCode: 25
}

module.exports = {

    name: nameValidator,
    nip: taxIdentificationNumberValidator
};