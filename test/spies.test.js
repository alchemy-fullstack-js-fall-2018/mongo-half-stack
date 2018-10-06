require('dotenv').config();
const Spies = require('../lib/models/Spies');

describe('spies model', () => {

    let createdSpies;

    beforeEach(() => {
        return Spies.drop();
    });

    beforeEach(() => {
        return Promise.all([
            Spies.create({ name:'James Bond', weapon:'PP9', vehicle:'Aston Martin' }),
            Spies.create({ name:'Jack Ryan', weapon:'Glock 19', vehicle:'Bike' }),
            Spies.create({ name:'Jason Bourne', weapon:'Fists', vehicle:'Feet' })
        ])
            .then(cs => createdSpies = cs);
    });

    it('gets a spy by id', () => {
        return Spies.get(createdSpies[0]._id)
            .then(receivedSpy => expect(receivedSpy).toEqual(createdSpies[0]));
    });

    it('gets all spies', () => {
        return Spies.getAll()
            .then(receivedSpies => expect(receivedSpies).toHaveLength(3));
    });

    it('creates a new spy in my db', () => {
        return Spies.create({ name:'Johnny English', weapon:'Incompetence', vehicle:'Parachute' })
            .then(createdSpy => {
                expect(createdSpy).toHaveProperty('_id');
                expect(createdSpy.name).toEqual('Johnny English');
                expect(createdSpy.weapon).toEqual('Incompetence');
                expect(createdSpy.vehicle).toEqual('Parachute');
            });
    });

    it('udpates a spy by id', () => {
        return Spies.update(createdSpies[0]._id, { weapon: 'Rocket Launcher', vehicle: 'Cessna' })
            .then(receivedSpy => expect(receivedSpy).toEqual({ ...createdSpies[0], weapon: 'Rocket Launcher', vehicle: 'Cessna' }));
    });

    it('kills a spy', () => {
        return Spies.delete(createdSpies[0]._id)
            .then(deadSpy => Spies.get(deadSpy._id))
            .then(receivedSpy => expect(receivedSpy).toBeNull());
    });
});
