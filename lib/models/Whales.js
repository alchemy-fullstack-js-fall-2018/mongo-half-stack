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

    getAll() {
        return db('Whales')
            .then(collection => {
                return collection.find();
            })
            .then(whalesDocObject => whalesDocObject.toArray());
    }

    drop() {
        return db('Whales').then(collection => collection.deleteMany());
    }

    update(id, species) {
        return db('Whales')
            .then(collection => {
                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) },
                    { $set: species },
                    { returnOriginal: false }
                );
            })
            .then(res => res.value);
    }

    delete(id) {
        return db('Whales')
            .then(collection => {
                return collection.deleteOne({ _id: ObjectId(id) });
            })
            .then(result => {
                if(result.deletedCount > 0) return { removed: true };
                else return { removed: false };
            });
    }

}

module.exports = new Whales();
