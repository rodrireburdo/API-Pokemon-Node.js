import { assert } from 'chai';
import { app } from '../app.js';
import { use } from 'chai';
import superagent from 'chai-superagent';
import request from 'supertest';

use(superagent());

//Test 1: Verifica que si no se proporciona un JWT, la respuesta del servidor sea 401 Unauthorized.
//Test 2: Verifica que si se proporciona un JWT válido, la respuesta del servidor sea 200 OK.

describe('Suite de pruebas auth', () => {
    it('should return 401 when no jwt token available', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        request(app)
            .get('/teams')
            .end((err, res) => {
                assert.equal(res.statusCode, 401);
                done();
            });
    });

    it('should return 400 when no data is provided', (done) => {
        request(app)
            .post('/auth/login')
            .end((err, res) => {
                //Expect valid login
                assert.equal(res.statusCode, 400);
                done();
            });
    });

    it('should return 200 and token for succesful login', (done) => {
        request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'bettatech', password: '1234' })
            .end((err, res) => {
                //Expect valid login
                assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('should return 200 when jwt is valid', (done) => {
        request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'mastermind', password: '4321' })
            .end((err, res) => {
                //Expect valid login
                assert.equal(res.statusCode, 200);
                request(app)
                    .get('/teams')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        assert.equal(res.statusCode, 200);
                        done();
                    });
            });
    });
});
