require('dotenv').config();
const Villains = require('../lib/models/Villains');

describe('spies model', () => {

    let createdVillains;

    beforeEach(() => {
        return Villains.drop();
    });

    beforeEach(() => {
        return Promise.all([
            Villains.create('Alec Trevelyan', 'GoldenEye Satellite', 'Money'),
            Villains.create('Mr Terrorist', 'Nuclear Warhead', 'Terror'),
            Villains.create('Brian Cox', 'Hitmen', 'Coverup')
        ])
            .then(createdVillainsFromPromise => {
                createdVillains = createdVillainsFromPromise;
            });
    });

    it('creates a new villain in my db', () => {
        return Villains.create('Sauvage', 'Poison', 'Hated Mr Bean')
            .then(createdVillain => {
                expect(createdVillain).toHaveProperty('_id');
                expect(createdVillain.name).toEqual('Sauvage');
                expect(createdVillain.weapon).toEqual('Poison');
                expect(createdVillain.motive).toEqual('Hated Mr Bean');
            });
    });

    it('gets a villain by id', () => {
        return Villains.get(createdVillains[0]._id)
            .then(receivedVillain => {
                expect(receivedVillain).toEqual(createdVillains[0]);
            });
    });
});
