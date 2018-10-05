const request = require('supertest');
require('dotenv').config();
const app = require('../lib/app');
const Dogs = require('../lib/models/Dogs');
const Birds = require('../lib/models/Birds');

describe('dog bird farm for dogs and birds', () => {

    describe('dawgs', () => {

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
    
        it('deletes a dog', () => {
            return request(app).delete(`/dogs/${createdDogs[0]._id}`)
                .then(res => {
                    expect(res.body).toEqual({ removed: true });
                });
        });
    
        it('returns 404 when there is no method', () => {
            return request(app)
                .patch('/dogs')
                .send({})
                .then(res => {
                    expect(res.statusCode).toEqual(404);
                });
        });
    
        it('returns 404 when no route', () => {
            return request(app).get('/aardvarks').then(res => {
                expect(res.statusCode).toEqual(404);
            });
        });
    });

    describe('birds', () => {
        
        const birds = [
            { name: 'Raymi', species: 'Lovebird' },
            { name: 'Fluffles', species: 'African Grey' }
        ];
        
        let createdBirds;
    
        const creator = bird => {
            return request(app).post('/birds')
                .send(bird);
        };
    
        beforeEach(() => {
            return Birds.drop();
        });
    
        beforeEach(() => {
            return Promise.all(birds.map(creator))
                .then(bs => {
                    createdBirds = bs.map(b => b.body);
                });
        });
    
        it('creates a new bird in our db', () => {
            return request(app).post('/birds')
                .send({ name: 'Tweety', species: 'Bald Eagle' })
                .then(res => {
                    expect(res.body).toEqual({
                        _id: expect.any(String),
                        name: 'Tweety',
                        species: 'Bald Eagle'
                    });
                });
        });
    
        it('"retrieves" a bird in our db by id', () => {
            return request(app).get(`/birds/${createdBirds[0]._id}`)
                .then(res => {
                    expect(res.body).toEqual(createdBirds[0]);
                });
        });
    
        it('"retrieves" all birds in our db', () => {
            return request(app).get('/birds').set('Accept', 'application/json')
                .then(res => {
                    expect(res.body).toEqual(createdBirds);
                });
        });
    
        it('changes a bird', () => {
            return request(app).put(`/birds/${createdBirds[0]._id}`)
                .send({ name: 'Batman' })
                .then(res => {
                    expect(res.body).toEqual({ ...createdBirds[0], name: 'Batman' });
                });
        });
    
        it('deletes a bird', () => {
            return request(app).delete(`/birds/${createdBirds[0]._id}`)
                .then(res => {
                    expect(res.body).toEqual({ removed: true });
                });
        });
    });
});
