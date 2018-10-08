require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const Authors = require('../lib/models/Authors');
// const Books = require('../lib/models/Books');

describe('app authors', () => {
    const authors = [
        { firstName: 'Ursula', lastName: 'Leguin' },
        { firstName: 'Virginia', lastName: 'Woolf' },
        { firstName: 'Toni', lastName: 'Morrison' }
    ];

    let createdAuthors;

    const creator = author => {
        return request(app).post('/authors')
            .send(author);
    };

    beforeEach(() => {
        return Authors.drop();
    });

    beforeEach(() => {
        return Promise.all(authors.map(creator))
            .then(authors => {
                createdAuthors = authors.map(author => author.body);
            });
    });


    it('creates an author', () => {
        const newAuthor = { firstName: 'Stephen', lastName: 'King' };
        return request(app).post('/authors')
            .send(newAuthor)
            .then(response => {
                console.log(response.body._id);
                expect(response.body._id).toEqual(expect.any(String));
                expect(response.body.firstName).toEqual('Stephen');
                expect(response.body.lastName).toEqual('King');
            });
    });

    it('gets all authors', () => {
        return request(app).get('/authors').set('Accept', 'application/json').then(res => {
            expect(res.body).toEqual(createdAuthors);
        });
    });

    it('gets an author by id', () => {
        return request(app).get(`/authors/${createdAuthors[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdAuthors[0]);
            });
    });

    it('deletes an author by id', () => {
        return request(app).delete(`/authors/${createdAuthors[0]._id}`)
            .then(() => {
                return request(app).get(`/authors/${createdAuthors[0]._id}`)
                    .then(res => {
                        expect(res.body).toBeFalsy();
                    });
            });
    });

});