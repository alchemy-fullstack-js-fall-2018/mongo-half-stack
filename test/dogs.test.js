require('dotenv').config();
const Dogs = require('../lib/models/Dogs');

describe('Dogs model', () => {

    let createdDogs;

    beforeEach(() => {
        return Dogs.drop();
    });

    beforeEach(() => {
        
        
        return Promise.all([
            Dogs.create('Bruce', 'Poodle'),
            Dogs.create('Fluffy', 'Pomeranian')
        ])
            .then(ds => createdDogs = ds);
    });

    it('gets a Dog by id', () => {
        return Dogs.get(createdDogs[0]._id)
            .then(receivedDog => {
                expect(receivedDog).toEqual(createdDogs[0]);
            });
    });

    it('gets all Dogs', () => {
        return Dogs.getAll()
            .then(receivedDogs => {
                expect(receivedDogs).toHaveLength(2);
            });
    });

    it('creates a new Dog in my db', () => {
        return Dogs.create('Tito', 'Pitbull')
            .then(createdDog => {
                expect(createdDog).toHaveProperty('_id');
                expect(createdDog.name).toEqual('Tito');
                expect(createdDog.breed).toEqual('Pitbull');
            });
    });

    it('updates a Dog by id', () => {
        return Dogs.update(createdDogs[0]._id, { name: 'Batman' })
            .then(receivedDog => {
                expect(receivedDog).toEqual({ ...createdDogs[0], name: 'Batman' });
            });
    });
});
