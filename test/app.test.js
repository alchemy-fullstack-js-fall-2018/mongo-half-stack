const request = require('supertest');
require('dotenv').config();
const app = require('../lib/app');
const Dogs = require('../lib/models/Dogs');

describe('dog bird farm for dogs and birds', () => {

    // let createdBirds;
    const dogs = [
        { name: 'bruce', breed: 'poodle' },
        { name: 'fluffy', breed: 'pomeranian' }
    ];
    
    let createdDogs;

    const creator = dog => {
        return request(app).post('/dogs')
            .send(dog);
    };

    beforeEach(() => {
        return Dogs.drop();
    });

    beforeEach(() => {
        return Promise.all(dogs.map(creator))
            .then(ds => {
                createdDogs = ds.map(d => d.body);
            });
    });

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

    it('retrieves a dog in our db by id', () => {
        return request(app).get(`/dogs/${createdDogs[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdDogs[0]);
            });
    });

});
