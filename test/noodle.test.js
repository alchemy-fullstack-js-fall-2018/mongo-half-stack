require('dotenv').config();
const Noodles = require('../lib/models/Noodle');

describe('oodles of noodles', () => {

    //change this let name after figuring out what it does//
    let createdNoodles;

    beforeEach(() => {
        return Noodles.drop();
    });

    beforeEach(() => {
        return Promise.all([
            Noodles.create('what the Pho', 'the bronx'),
            Noodles.create('Pho king', 'queens'),
            Noodles.create('Pho fo me', 'brooklyn')
        ])
            .then(createdPhoLocations => {
                createdNoodles = createdPhoLocations;
            });
    });

    it('creates a new pho location in the db', () => {
        return Noodles.create('what the Pho', 'the bronx')
            .then(createNoodle => {
                expect(createNoodle).toHaveProperty('_id');
                expect(createNoodle.name).toEqual('what the Pho');
                expect(createNoodle.location).toEqual('the bronx'); 
            });
    });

    it('gets a pho location in the db by ID', () => {
        return Noodles.get(createdNoodles[0]._id)
            .then(foundNoodles => {
                expect(foundNoodles).toEqual(createdNoodles[0]);
            });
    });

    it('gets all locations', () => {
        return Noodles.getAll()
            .then(noodleInfo => {
                expect (noodleInfo).toHaveLength(3);
            });
    });

    it('updates a location by id', () => {
        return Noodles.update(createdNoodles[0]._id, { name: 'pholong' })
            .then(receivedNoodles => {
                expect(receivedNoodles).toEqual({ ...createdNoodles[0], name: 'pholong' });
            });
    });

    it('deletes a Bird by id', () => {
        return Noodles.delete(createdNoodles[0]._id)
            .then(result => {
                expect(result.removed).toEqual(true);
            });
    });
});
