const request = require('supertest');
const app = require('../lib/app');
// const Authors = require('../lib/models/Authors');
// const Books = require('../lib/models/Books');

describe('app authors', () => {
    it('creates an author', () => {
        const newAuthor = { firstName: 'Ursula', lastName: 'Le Guin' };
        return request(app).post('/authors')
            .send(newAuthor)
            .then(response => {
                expect(response.body).toHaveProperty('_id');
                expect(response.body.firstName).toEqual('Ursula');
                expect(response.body.lastName).toEqual('Le Guin');
            });
    });
});