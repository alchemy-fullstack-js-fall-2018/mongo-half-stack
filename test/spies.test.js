require('dotenv').config();
const Spies = require('../lib/models/Spies');

describe('spies model', () => {

    let createdSpies;

    beforeEach(() => {
        return Spies.drop();
    });

    beforeEach(() => {
        return Promise.all([
            Spies.create('James Bond', 'PP9', 'Aston Martin'),
            Spies.create('Jack Ryan', 'Glock 19', 'Bike'),
            Spies.create('Jason Bourne', 'Fists', 'Feet')
        ])
            .then(cs => createdSpies = cs);
    });

    it('creates a new spy in my db', () => {
        return Spies.create('Johnny English', 'Incompetence', 'Parachute')
            .then(createdSpy => {
                expect(createdSpy).toHaveProperty('_id');
                expect(createdSpy.name).toEqual('Johnny English');
                expect(createdSpy.weapon).toEqual('Incompetence');
                expect(createdSpy.vehicle).toEqual('Parachute');
            });
    });

    it('gets a spy by id', () => {
        return Spies.get(createdSpies[0]._id)
            .then(receivedSpy => {
                expect(receivedSpy).toEqual(createdSpies[0]);
            });
    });

    it('gets all spies', () => {
        return Spies.getAll()
            .then(receivedSpies => {
                expect(receivedSpies).toHaveLength(3);
            });
    });

    it('udpates a spy by id', () => {

        return Spies.get(createdSpies[0]._id)
            .then(receivedSpy => {
                return Spies.update(receivedSpy._id, { weapon: 'Rocket Launcher', vehicle: 'Cessna' });
            })
            .then(receivedSpy => {
                expect(receivedSpy).toEqual({ ...createdSpies[0], weapon: 'Rocket Launcher', vehicle: 'Cessna' });
            });
    });

    it('kills a spy', () => {

        return Spies.delete(createdSpies[0]._id)
            .then(receivedSpy => {
                return Spies.get(receivedSpy._id);
            })
            .then(receivedSpy => {
                expect(receivedSpy).toBeNull();
            });
    });



});
