const request = require('supertest');
require('dotenv').config();
const app = require('../lib/app');

describe('dog bird farm for dogs and birds', () => {

    // let createdDogs;
    // let createdBirds;

    it('creates a new dog in our db', () => {
        return request(app).post('/dogs')
            .send('tito', 'pitbull')
            .then(res => {
                const json = JSON.parse(res);
                expect(json).toHaveProperty('_id');
                expect(json.name).toEqual('tito');
                expect(json.breed).toEqual('pitbull');
            });
    });


});
