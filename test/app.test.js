require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const Authors = require('../lib/models/Authors');
const Books = require('../lib/models/Books');

describe('app authors', () => {
    const authors = [
        { firstName: 'Ursula', lastName: 'Leguin' },
        { firstName: 'Virginia', lastName: 'Woolf' },
        { firstName: 'Toni', lastName: 'Morrison' }
    ];

    let createdAuthors;

    const authorCreator = author => {
        return request(app).post('/authors')
            .send(author);
    };

    beforeEach(() => {
        return Authors.drop();
    });

    beforeEach(() => {
        return Promise.all(authors.map(authorCreator))
            .then(authors => {
                createdAuthors = authors.map(author => author.body);
            });
    });

    it('creates an author', () => {
        const newAuthor = { firstName: 'Stephen', lastName: 'King' };
        return request(app).post('/authors')
            .send(newAuthor)
            .then(response => {
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

    it('updates an author by id', () => {
        const revisedAuthor = { firstName: 'Ursula', lastName: 'LeGuin' };
        return request(app).put(`/authors/${createdAuthors[0]._id}`)
            .send(revisedAuthor)
            .then(res => {
                expect(res.body.firstName).toEqual(revisedAuthor.firstName);
                expect(res.body.lastName).toEqual(revisedAuthor.lastName);
            });
    });

});


describe('app books', () => {

    const books = [
        { title: 'Lord of the Rings', genre: 'Fantasy' },
        { title: 'To the Lighthouse', genre: 'Literary Fiction' },
        { title: 'Clear and Present Danger', genre: 'Popular Fiction' }
    ];

    let createdBooks;

    const bookCreator = book => {
        return request(app).post('/books')
            .send(book);
    };

    beforeEach(() => {
        return Books.drop();
    });

    beforeEach(() => {
        return Promise.all(books.map(bookCreator))
            .then(books => {
                createdBooks = books.map(book => book.body);
            });
    });

    it('creates a book', () => {
        const newBook = { title: 'The Stand', genre: 'Horror' };
        return request(app).post('/books')
            .send(newBook)
            .then(response => {
                expect(response.body._id).toEqual(expect.any(String));
                expect(response.body.title).toEqual('The Stand');
                expect(response.body.genre).toEqual('Horror');
            });
    });

    it('gets all books', () => {
        return request(app).get('/books').set('Accept', 'application/json').then(res => {
            expect(res.body).toEqual(createdBooks);
        });
    });

    it('gets a book by id', () => {
        return request(app).get(`/books/${createdBooks[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdBooks[0]);
            });
    });

    it('deletes a book by id', () => {
        return request(app).delete(`/books/${createdBooks[0]._id}`)
            .then(() => {
                return request(app).get(`/books/${createdBooks[0]._id}`)
                    .then(res => {
                        expect(res.body).toBeFalsy();
                    });
            });
    });

    it('updates a book by id', () => {
        const revisedBook = { title: 'The Lord of the Rings', genre: 'Fantasy' };
        return request(app).put(`/books/${createdBooks[0]._id}`)
            .send(revisedBook)
            .then(res => {
                expect(res.body.title).toEqual(revisedBook.title);
                expect(res.body.genre).toEqual(revisedBook.genre);
            });
    });
    
});


describe('error handling', () => {
    it('returns 404 when there is no method', () => {
        return request(app)
            .patch('/tweets')
            .send({})
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });

    it('returns 404 when there is no route', () => {
        return request(app).get('/quarks').then(res => {
            expect(res.statusCode).toEqual(404);
        });
    });
});
