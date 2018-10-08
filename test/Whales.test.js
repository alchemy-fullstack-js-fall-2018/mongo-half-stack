require('dotenv').config();
const Whales = require('../lib/models/Whales');

describe('whales model', () => {
    let createdWhales;

    beforeEach(() => {
        return Whales.drop();
    });

    beforeEach(() => {
        return Promise.all([
            Whales.create('Gray Whale', 'Least Concern'),
            Whales.create('Beluga Whale', 'Least Concern'),
            Whales.create('Narwhal', 'Nearly Threatened')
        ])
            .then(createdWhalesFromPromise => {
                createdWhales = createdWhalesFromPromise;
            });
    });

    it('MODEL creates a whale in our db', () => {
        return Whales.create('Humpback Whale', 'Least Concern')
            .then(createdWhale => {
                expect(createdWhale).toHaveProperty('_id');
                expect(createdWhale.species).toEqual('Humpback Whale');
                expect(createdWhale.status).toEqual('Least Concern');
            });
    });

    it('MODEL gets a whale by its id', () => {
        return Whales.get(createdWhales[0]._id)
            .then(receivedWhale => {
                expect(receivedWhale).toEqual(createdWhales[0]);
            });
    });

    it('MODEL gets all whales in an array', () => {
        return Whales.getAll()
            .then(whalesArr => {
                expect(whalesArr).toEqual(createdWhales);
            });
    });

    it('MODEL changes a whale by its id', () => {
        return Whales.update(createdWhales[0]._id, { species: 'Grey Whale' })
            .then(updatedWhale => {
                expect(updatedWhale).toEqual({ ...createdWhales[0], species: 'Grey Whale' });
            });
    });

    it('MODEL deletes a whale by id', () => {
        return Whales.delete(createdWhales[1]._id)
            .then(res => {
                expect(res.removed).toEqual(true);
            });
    });


});
