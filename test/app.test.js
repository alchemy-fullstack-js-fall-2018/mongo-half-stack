const request = require('supertest');
require('dotenv').config();
const app = require('../lib/app');

describe('dog bird farm for dogs and birds', () => {

    // let createdDogs;
    // let createdBirds;

    it('creates a new dog in our db', () => {
        return request(app).post('/dogs')
            .send({ name: 'tito', breed: 'pitbull' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'tito',
                    breed: 'pitbull'
                });
            });
    });


});
