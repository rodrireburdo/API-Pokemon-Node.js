import { assert } from 'chai';
import { app } from '../app.js';
import { use } from 'chai';
import superagent from 'chai-superagent';
import request from 'supertest';

use(superagent());

describe('Suite de pruebas teams', () => {
    it('should return the team of the given user', (done) => {
        let team = [{name:'Charizard'}, {name:'Blastoise'}, {name:'Pikachu'}];
        request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'rodri', password: '4321' })
            .end((err, res) => {
                let token = res.body.token;
                assert.equal(res.statusCode, 200);
                request(app)
                    .put('/teams')
                    .send({
                        team: team
                    })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                assert.equal(res.statusCode, 200);
                                assert.equal(res.body.trainer, 'rodri');
                                assert.equal(res.body.team.length, team.length);
                                assert.equal(res.body.team[0].name, team[0].name);
                                assert.equal(res.body.team[1].name, team[1].name);
                                done();
                            })
                    });
            });
    });
});