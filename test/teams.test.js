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
    await teamsController.cleanUpTeam();
})

describe('Suite de pruebas teams', () => {
    it('should return the team of the given user', (done) => {
        let team = [{ name: 'Charizard' }, { name: 'Blastoise' }, { name: 'Pikachu' }];
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

    it('should return the podex number', (done) => {
        let pokemonName = 'Bulbasaur';
        request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'bettatech', password: '1234' })
            .end((err, res) => {
                let token = res.body.token;
                assert.equal(res.statusCode, 200);
                request(app)
                    .post('/teams/pokemons')
                    .send({ name: pokemonName })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                assert.equal(res.statusCode, 200);
                                assert.equal(res.body.trainer, 'bettatech');
                                assert.equal(res.body.team.length, 1);
                                assert.equal(res.body.team[0].name, pokemonName);
                                assert.equal(res.body.team[0].pokedexNumber, 1);
                                done();
                            })
                    });
            });
    });

    it('should return the pokedex number', (done) => {
        let team = [{name: 'Charizard'}, {name: 'Blastoise'}, {name: 'Pikachu'}];
        request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'rodri', password: '4321'})
            .end((err, res) => {
                let token = res.body.token;
                //Expect valid login
                assert.equal(res.statusCode, 200);
                request(app)
                    .put('/teams')
                    .send({team: team})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        request(app)
                            .delete('/teams/pokemons/1')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                request(app)
                                    .get('/teams')
                                    .set('Authorization', `JWT ${token}`)
                                    .end((err, res) => {
                                        assert.equal(res.statusCode, 200);
                                        assert.equal(res.body.trainer, 'rodri');
                                        assert.equal(res.body.team.length, team.length - 1);
                                        done();
                                    });
                            });
                    });
            });
    });

    it('should not be able to add pokemon if you already have 6', (done) => {
        let team = [
            {name: 'Charizard'}, 
            {name: 'Blastoise'}, 
            {name: 'Pikachu'},
            {name: 'Charizard'}, 
            {name: 'Blastoise'}, 
            {name: 'Pikachu'}];
        request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'rodri', password: '4321'})
            .end((err, res) => {
                let token = res.body.token;
                //Expect valid login
                assert.equal(res.statusCode, 200);
                request(app)
                    .put('/teams')
                    .send({team: team})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        request(app)
                            .post('/teams/pokemons')
                            .send({name: 'vibrava'})
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                assert.equal(res.statusCode, 400);
                                done();
                            });
                    });
            });
    });
});