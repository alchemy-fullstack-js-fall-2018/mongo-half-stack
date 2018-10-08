require('dotenv').config();
const Books = require('../lib/models/Books');

describe('books model', () => {
    let createdBooks;

    beforeEach(() => {
        return Books.drop();
    });

    beforeEach(() => {
        return Promise.all([
            Books.create('Lord of the Rings', 'Fantasy'),
            Books.create('To the Lighthouse', 'Literary Fiction'),
            Books.create('Clear and Present Danger', 'Popular Fiction')
        ])
            .then(createdBooksFromPromise => {
                createdBooks = createdBooksFromPromise;
            });
    });

    it('tests to make sure a book was added', () => {
        expect(createdBooks[0]).toHaveProperty('_id');
        expect(createdBooks[0].title).toEqual('Lord of the Rings');
        expect(createdBooks[0].genre).toEqual('Fantasy');
    });   

    it('gets a book by id', () => {
        return Books.get(createdBooks[0]._id)
            .then(receivedBook => {
                expect(receivedBook.title).toEqual('Lord of the Rings');
                expect(receivedBook.genre).toEqual('Fantasy');
            });
    });

    it('gets all books', () => {
        return Books.getAll()
            .then(receivedBooks => {
                createdBooks.forEach (createdBook => {
                    expect(receivedBooks).toContainEqual(createdBook);
                });
                
            });
    });

    it('deletes a book by id', () => {
        return Books.delete(createdBooks[0]._id)
            .then(() => Books.getAll()) 
            .then(receivedBooks => {
                expect(receivedBooks).toContainEqual(createdBooks[1]);
                expect(receivedBooks).toContainEqual(createdBooks[2]);
            });
            
    });

    it('updates a book by id', () => {
        const revisedBook = createdBooks[0];
        revisedBook.title = 'The Lord of the Rings';
        return Books.update(revisedBook._id, revisedBook)
            .then((updatedBook) => {
                expect(updatedBook).toEqual(revisedBook);
            });
    });

});
