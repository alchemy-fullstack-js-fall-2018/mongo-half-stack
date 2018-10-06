const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Books {
    create(title, genre) {
        return db('books')
            .then(collection => {
                return collection.insertOne({
                    title,
                    genre
                });
            })
            .then(result => result.ops[0]);
    }

    get(_id) {
        return db('books')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(_id) });
            });
    }

    getAll() {
        return db('books')
            .then(collection => {
                return collection.find();
            })
            .then(booksDocObject => {
                return booksDocObject.toArray();
            });
    }

    drop() {
        return db('books').then(collection => collection.deleteMany());
    }

    delete(_id) {
        return db('books')
            .then(collection => collection.deleteOne({ _id: ObjectId(_id) }));
    }

    update(_id, newContent) {
        return db('books')
            .then(collection => collection.updateOne(
                { _id: ObjectId(_id) }, 
                { $set: newContent }
            ))
            .then(() => this.get(_id));
    }
}

module.exports = new Books();