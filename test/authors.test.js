require('dotenv').config();
const Authors = require('../lib/models/Authors');

describe('authors model', () => {
    let _id;

    it('adds an author to authors collection', () => {
        return Authors.create('Ursula', 'Le Guin')
            .then(createdAuthor => {
                _id = createdAuthor._id;
                expect(createdAuthor).toHaveProperty('_id');
                expect(createdAuthor.firstName).toEqual('Ursula');
                expect(createdAuthor.lastName).toEqual('Le Guin');
            });
    });

    it('gets an author by id', () => {
        return Authors.get(_id)
            .then(receivedAuthor => {
                expect(receivedAuthor.firstName).toEqual('Ursula');
                expect(receivedAuthor.lastName).toEqual('Le Guin');
            });
    });
});