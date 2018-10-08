const request = require('supertest');
const app = require('../lib/app');
const Authors = require('../lib/models/Authors');
const Books = require('../lib/models/Books');

describe('app authors', () => {
    it('gets an author by id', () => {
        const newAuthor = { firstName: 'Ursula', lastName: 'Le Guin' };
        return request(app).post('/authors')
            .send(newAuthor)
            .then(response => {
                expect(response.body).toEqual(newAuthor);
            });
    });
});