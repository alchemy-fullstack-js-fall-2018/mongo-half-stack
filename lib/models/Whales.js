const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Whales {
    constructor() {
        this.whales = new Map();
    }

    create(species, status) {
        return db('Whales')
            .then(collection => {
                return collection.insertOne({
                    species,
                    status
                });
            })
            .then(result => result.ops[0]);
    }

    get(id) {
        return db('Whales')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
    }

    drop() {
        return db('Whales').then(collection => collection.deleteMany());
    }

}

module.exports = new Whales();
