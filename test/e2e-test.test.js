import { assert } from 'chai';
import { app } from '../app.js';
import { use } from 'chai';
import superagent from 'chai-superagent';
import request from 'supertest';

use(superagent());

describe('Suite de prueba e2e', () => {
    it('should return hello world', (done) => {
        request(app)
            .get('/')
            .end((err, res) => {
                assert.equal(res.text, "Hello world!")
                done();
            });
    });
});