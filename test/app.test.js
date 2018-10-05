const request = require('supertest');
// const nock = require('nock');
const app = require('../lib/app');

describe('whale/rodent manager', () => {
    it('creates a rodent', () => {
        return request(app).post('/rodents')
            .send({ species: 'Red-Crested Tree-Rat', status: 'Threatened' })
            .then(res => {
                const json = JSON.parse(res.text);
                expect(json.species).toEqual('Red-Crested Tree-Rat');
                expect(json.status).toEqual('Threatened');
                expect(json.id).toEqual(expect.any(String));
            });
    });
});
