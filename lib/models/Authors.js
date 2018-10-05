const db = require('../mongo-connector');
// const { ObjectId } = require('mongodb');

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
}

module.exports = new Authors();