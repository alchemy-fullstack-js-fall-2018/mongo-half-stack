# mongo-half-stack

This application provides HTTP access to a Mongo database of books and authors.  It is only a half-stack application and has no user interface.

## Database: bookcase

### Collection: Authors

* field: firstName
* field: lastName

### Collection: Books

* field: title
* field: genre

## Supported HTTP methods

Any request that doesn't conform to the below formats results in a 404 error.

### GET /books

Gets all books in the database

### POST /books

Adds a new book to the database

### GET /books/:id

Given a valid ID, returns a book from the database

### DELETE /books/:id

Given a valid ID, deletes a book from the database

### PUT /books/:id

Given a valid ID, updates a book in the database.  Note: If only a subset of data elements are provided, the rest will be replaced with empty or null.

### GET /authors

Gets all authors in the database

### POST /authors

Adds a new author to the database

### GET /authors/:id

Given a valid ID, returns an author from the database

### DELETE /authors/:id

Given a valid ID, deletes an author from the database

### PUT /authors/:id

Given a valid ID, updates an author in the database.  Note: If only a subset of data elements are provided, the rest will be replaced with empty or null.
