require('dotenv').config();
const Villains = require('../lib/models/Villains');

describe('Villains model', () => {

    let createdVillains;

    beforeEach(() => {
        return Villains.drop();
    });

    beforeEach(() => {
        return Promise.all([
            Villains.create({ name:'Alec Trevelyan', weapon:'GoldenEye Satellite', motive:'Money' }),
            Villains.create({ name:'Mr Terrorist', weapon:'Nuclear Warhead', motive:'Terror' }),
            Villains.create({ name:'Brian Cox', weapon:'Hitmen', motive:'Coverup' })
        ])
            .then(cv => createdVillains = cv);
    });

    it('gets a villain by id', () => {
        return Villains.get(createdVillains[0]._id)
            .then(receivedVillain => expect(receivedVillain).toEqual(createdVillains[0]));
    });

    it('gets all villains', () => {
        return Villains.getAll()
            .then(recievedVillains => expect(recievedVillains).toHaveLength(3));
    });

    it('creates a new villain in my db', () => {
        return Villains.create({ name:'Sauvage', weapon:'Poison', motive:'Hated Mr Bean' })
            .then(createdVillain => {
                expect(createdVillain).toHaveProperty('_id');
                expect(createdVillain.name).toEqual('Sauvage');
                expect(createdVillain.weapon).toEqual('Poison');
                expect(createdVillain.motive).toEqual('Hated Mr Bean');
            });
    });

    it('udpates a villian by id', () => {
        return Villains.update(createdVillains[0]._id, { weapon: 'Rocket Launcher', motive: 'jealousy' })
            .then(updatedVillian => expect(updatedVillian).toEqual({ ...createdVillains[0], weapon: 'Rocket Launcher', motive: 'jealousy' }));
    });

    it('kills a villian', () => {
        return Villains.delete(createdVillains[0]._id)
            .then(receivedVillian => Villains.get(receivedVillian._id))
            .then(receivedVillian => expect(receivedVillian).toBeNull());
    });
});
