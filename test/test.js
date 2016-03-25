'use strict';

const Code = require('code');
const Lab = require('lab');
const Hapi = require('hapi');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('decorator plugin', () => {

    it('test', (done) => {

        var server = new Hapi.Server();
        server.connection();

        server.inject('/test', (res) => {

            expect(res.result.statusCode).to.equal(404);
            done();

        });
    })
});
