const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Dogs {
    constructor() {
        this.dogs = new Map();
    }

    create(name, breed) {
        return db('dogs')
            .then(collection => {
                return collection.insertOne({
                    name,
                    breed
                });
            })
            .then(result => result.ops[0]);
    }
}
