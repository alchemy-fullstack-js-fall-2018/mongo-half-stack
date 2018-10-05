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

    get(id) {
        return db('dogs')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
    }

    getAll() {
        return db('dogs')
            .then(collection => {
                return collection.find();
            })
            .then(dogsDocObject => dogsDocObject.toArray());
    }

    update(id, name) {
        return db('dogs')
            .then(collection => {
                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) }, 
                    { $set: name }, 
                    { returnOriginal: false }
                );
            })
            .then(res => res.value);
            
    }
    delete(id) {
        return db('dogs')
            .then(collection => {
                return collection.deleteOne(
                    { _id: ObjectId(id) }
                );
            })
            .then(result => {
                if(result.deletedCount > 0) return { removed: true };
                else return { removed: false };
            });
    }   

    drop() {
        return db('dogs').then(collection => collection.deleteMany());
    }
}
module.exports = new Dogs();
