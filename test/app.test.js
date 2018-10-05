require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');

describe('whale/rodent manager', () => {
    it('creates a rodent', () => {
        return request(app).post('/rodents')
            .send({ species: 'Red-Crested Tree-Rat', status: 'Threatened' })
            .then(res => {
                const json = res.body;
                console.log(json);
                expect(json.species).toEqual('Red-Crested Tree-Rat');
                expect(json.status).toEqual('Threatened');
                expect(json._id).toEqual(expect.any(String));
            });
    });
});
