require('dotenv').config();
const Birds = require('../lib/models/Birds');

describe('Birds model', () => {

    let createdBirds;

    beforeEach(() => {
        return Birds.drop();
    });

    beforeEach(() => {
        
        
        return Promise.all([
            Birds.create('Raymi', 'Lovebird'),
            Birds.create('Fluffles', 'African Grey')
        ])
            .then(ds => createdBirds = ds);
    });

    it('gets a Bird by id', () => {
        return Birds.get(createdBirds[0]._id)
            .then(receivedBird => {
                expect(receivedBird).toEqual(createdBirds[0]);
            });
    });

    it('gets all Birds', () => {
        return Birds.getAll()
            .then(receivedBirds => {
                expect(receivedBirds).toHaveLength(2);
            });
    });

    it('creates a new Bird in my db', () => {
        return Birds.create('Tweety', 'Bald Eagle')
            .then(createdBird => {
                expect(createdBird).toHaveProperty('_id');
                expect(createdBird.name).toEqual('Tweety');
                expect(createdBird.species).toEqual('Bald Eagle');
            });
    });

    it('updates a Bird by id', () => {
        return Birds.update(createdBirds[0]._id, { name: 'Batman' })
            .then(receivedBird => {
                expect(receivedBird).toEqual({ ...createdBirds[0], name: 'Batman' });
            });
    });

    it('deletes a Bird by id', () => {
        return Birds.delete(createdBirds[0]._id)
            .then(result => {
                expect(result.removed).toEqual(true);
            });
    });
});
