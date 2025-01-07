import { assert } from 'chai';
import { app } from '../app.js';
import { use } from 'chai';
import superagent from 'chai-superagent';
import request from 'supertest';

use(superagent());

describe('Suite de pruebas teams', () => {
    it('should return the team of the given user', (done) => {
        request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'rodri', password: '4321' })
            .end((err, res) => {
                assert.equal(res.statusCode, 200);
                request(app)
                    .get('/teams')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        // tiene equipo con charizard y blastoise
                        // { trainer: rodri, team: [pokemons] }
                        assert.equal(res.statusCode, 200);
                        assert.equal(res.body.trainer, 'rodri');
                        assert.equal(res.body.team.length, 2);
                        done();
                        assert.equal(res.body.team[0].name, 'Charizard');
                        assert.equal(res.body.team[1].name, 'Blastoise');
                    });
            });
    });
});