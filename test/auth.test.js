import { assert } from 'chai';
import { app } from '../app.js';
import { use } from 'chai';
import superagent from 'chai-superagent';
import request from 'supertest';

import usersController from "../auth/controller-users.js";
import teamsController from "../teams/controller-teams.js";

use(superagent());

beforeEach(async () => {
    await usersController.registerUser('rodri', '4321');
    await usersController.registerUser('bettatech', '1234');
})

afterEach(async () => {
    await usersController.cleanUpUsers();
    await teamsController.cleanUpTeam();
});

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
            .send({ user: 'rodri', password: '4321' })
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
