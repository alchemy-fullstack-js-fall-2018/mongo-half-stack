require('dotenv').config();
const Authors = require('../lib/models/Authors');

describe('authors model', () => {
    it('adds an author to authors collection', () => {
        return Authors.create('Ursula', 'Le Guin')
            .then(createdAuthor => {
                expect(createdAuthor).toHaveProperty('_id');
                expect(createdAuthor.firstName).toEqual('Ursula');
                expect(createdAuthor.lastName).toEqual('Le Guin');
            });
    });
});