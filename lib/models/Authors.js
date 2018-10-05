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

    drop() {
        return db('authors').then(collection => collection.deleteMany());
    }
}

module.exports = new Authors();