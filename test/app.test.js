require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const Authors = require('../lib/models/Authors');
// const Books = require('../lib/models/Books');

describe('app authors', () => {

    // beforeEach(() => {
    //     return Authors.drop();
    // });

    // [ { firstName: 'Ursula', lastName: 'Le Guin' };
    // const newAuthor2 = { firstName: 'Virginia', lastName: 'Woolf' };
    // const newAuthor3 = { firstName: 'Toni', lastName: 'Morrison' };

    // beforeEach(() => {
    //     return Promise.all([
    //        return request(app).post('/authors').send(newAuthor1);
    //     ])
    //         .then(createdAuthorsFromPromise => {
    //             createdAuthors = createdAuthorsFromPromise;
    //         });
    // });

    it('creates an author', () => {
        const newAuthor = { firstName: 'Ursula', lastName: 'Le Guin' };
        return request(app).post('/authors')
            .send(newAuthor)
            .then(response => {
                console.log(response.body._id);
                expect(response.body._id).toEqual(expect.any(String));
                expect(response.body.firstName).toEqual('Ursula');
                expect(response.body.lastName).toEqual('Le Guin');
            });
    });
});