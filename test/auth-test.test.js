import { assert } from 'chai'; 
import { app } from '../app.js'; 
import { use } from 'chai'; 
import superagent from 'chai-superagent'; 
import request from 'supertest'; 

use(superagent()); 

//Test 1: Verifica que si no se proporciona un JWT, la respuesta del servidor sea 401 Unauthorized.
//Test 2: Verifica que si se proporciona un JWT válido, la respuesta del servidor sea 200 OK.

describe('Suite de pruebas de autenticación', () => {
    it ('should return 401 when no jwt token available', (done) => {
        request(app) 
            .get('/team') 
            .end((err, res) => {
                assert.equal(res.status, 401); 
                done(); 
            });
    });    
    it ('should return 200 when jwt is valid', (done) => {
        request(app)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({ username: 'admin', password: 'admin' })
            .end((err, res) => { 
                request(app) 
                    .get('/team')
                    .set('Authorization', `JWT ${res.body.token}`) 
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        done();
                    });
            });
    });
});