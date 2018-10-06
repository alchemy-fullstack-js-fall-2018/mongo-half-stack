const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Authors {
    create(firstName, lastName) {
        return db('authors')
            .then(collection => {
                return collection.insertOne({
                    firstName,
                    lastName
                });
            })
            .then(result => result.ops[0]);
    }

    get(_id) {
        return db('authors')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(_id) });
            });
    }

    getAll() {
        return db('authors')
            .then(collection => {
                return collection.find();
            })
            .then(authorsDocObject => {
                // console.log('authors:', authorsDocObject);
                // console.log('authors to array', authorsDocObject.toArray());
                return authorsDocObject.toArray();
            });
    }

    drop() {
        return db('authors').then(collection => collection.deleteMany());
    }

    delete(_id) {
        return db('authors')
            .then(collection => collection.deleteOne({ _id: ObjectId(_id) }));
    }

    update(_id, newContent) {
        return db('authors')
            .then(collection => collection.updateOne(
                { _id: ObjectId(_id) }, 
                { $set: newContent }
            ))
            .then(() => this.get(_id));
    }
}

module.exports = new Authors();