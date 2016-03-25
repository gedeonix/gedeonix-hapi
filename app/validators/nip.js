'use strict';

const taxIdentificationNumberValidator = {

    validator: (val) => {
        if (val) {
            const nip = val.replace(/\-/g, '');
            if (nip.length === 10) {

                let i;
                for (i = 0; i < 10; i++) {
                    if (isNaN(nip[i])) {
                        return false;
                    }
                }
                const sum = (6 * nip[0] + 5 * nip[1] + 7 * nip[2] + 2 * nip[3] + 3 * nip[4] + 4 * nip[5] + 5 * nip[6] + 6 * nip[7] + 7 * nip[8]) % 11;
                if (Number(nip[9]) === sum) {
                    return true;
                }
            }
        }
        return false;
    },
    message: 'Tax Identification Number has the wrong format',
    errorCode: 25
};

module.exports = taxIdentificationNumberValidator;
