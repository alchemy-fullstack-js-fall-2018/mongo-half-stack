require('dotenv').config();
const Authors = require('../lib/models/Authors');

describe('authors model', () => {
    let createdAuthors;

    beforeEach(() => {
        return Authors.drop();
    });

    beforeEach(() => {
        return Promise.all([
            Authors.create('Ursula', 'Le Guin'),
            Authors.create('Virginia', 'Woolf'),
            Authors.create('Toni', 'Morrison')
        ])
            .then(createdAuthorsFromPromise => {
                createdAuthors = createdAuthorsFromPromise;
            });
    });

    it('tests to make sure an author was added', () => {
        expect(createdAuthors[0]).toHaveProperty('_id');
        expect(createdAuthors[0].firstName).toEqual('Ursula');
        expect(createdAuthors[0].lastName).toEqual('Le Guin');
    });   

    it('gets an author by id', () => {
        return Authors.get(createdAuthors[0]._id)
            .then(receivedAuthor => {
                expect(receivedAuthor.firstName).toEqual('Ursula');
                expect(receivedAuthor.lastName).toEqual('Le Guin');
            });
    });

    // it('gets all authors', () => {
    //     return Authors.get()
    //         .then(receivedAuthors => {
    //             expect(receivedAuthors.length).
    //         });
    // });

});