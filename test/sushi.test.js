require('dotenv').config();
const Sushis = require('../lib/models/Sushi');

describe('all about the sushi', () => {

    let createdSushiRolls;

    beforeEach(() => {
        return Sushis.drop();
    });

    beforeEach(() => {
        return Promise.all([
            Sushis.create('texas roll', 'texas'),
            Sushis.create('philly roll', 'philadelphia'),
            Sushis.create('las vegas roll', 'nevada')
        ])
            .then(createdSushiLocations => {
                createdSushiRolls = createdSushiLocations;
            });
    });

    it('creates a new sushi roll and origin in the db', () => {
        return Sushis.create('texas roll', 'texas')
            .then(createdSushi => {
                expect(createdSushi).toHaveProperty('_id');
                expect(createdSushi.name).toEqual('texas roll');
                expect(createdSushi.location).toEqual('texas'); 
            });
    });

    it('gets a sushi origin in the db by ID', () => {
        return Sushis.get(createdSushiRolls[0]._id)
            .then(foundSushiRoll => {
                expect(foundSushiRoll).toEqual(createdSushiRolls[0]);
            });
    });

    it('gets all sushi origins', () => {
        return Sushis.getAll()
            .then(sushiInfo => {
                expect (sushiInfo).toHaveLength(3);
            });
    });

    it('updates an origin by id', () => {
        return Sushis.update(createdSushiRolls[0]._id, 'veggie roll')
            .then(receivedDeliverySushi => {
                expect(receivedDeliverySushi).toEqual({ ...createdSushiRolls[0], name: 'veggie roll' });
            });
    });

    it('deletes a sushi by id', () => {
        return Sushis.delete(createdSushiRolls[0]._id)
            .then(result => {
                expect(result).toEqual({ removed: true });
            });
    });
});
