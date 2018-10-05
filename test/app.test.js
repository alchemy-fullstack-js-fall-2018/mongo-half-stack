const request = require('supertest');
require('dotenv').config();
const app = require('../lib/app');
const Dogs = require('../lib/models/Dogs');

describe('dog bird farm for dogs and birds', () => {

    // let createdBirds;
    const dogs = [
        { name: 'Bruce', breed: 'Poodle' },
        { name: 'Fluffy', breed: 'Pomeranian' }
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
            .send({ name: 'Tito', breed: 'Pitbull' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'Tito',
                    breed: 'Pitbull'
                });
            });
    });

    it('"retrieves" a dog in our db by id', () => {
        return request(app).get(`/dogs/${createdDogs[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdDogs[0]);
            });
    });

    it('"retrieves" all dogs in our db', () => {
        return request(app).get('/dogs').set('Accept', 'application/json')
            .then(res => {
                expect(res.body).toEqual(createdDogs);
            });
    });

    it('changes a dog', () => {
        return request(app).put(`/dogs/${createdDogs[0]._id}`)
            .send({ name: 'Batman' })
            .then(res => {
                expect(res.body).toEqual({ ...createdDogs[0], name: 'Batman' });
            });
    });

});
