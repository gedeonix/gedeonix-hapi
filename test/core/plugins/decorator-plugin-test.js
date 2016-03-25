'use strict';

const Code = require('code');
const Lab = require('lab');
const Hapi = require('hapi');

const decoratorPlugin = require('../../../app/core/plugins/decorator-plugin');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('decorator plugin', () => {

    it('test1', (done) => {

        var server = new Hapi.Server();
        server.connection();

        server.register(decoratorPlugin, (err) => {

            expect(err).to.not.exist();

            //TODO

            done();
        });
    })

});
