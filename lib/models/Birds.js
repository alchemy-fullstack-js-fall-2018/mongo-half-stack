const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Birds {
    constructor() {
        this.birds = new Map();
    }

    create(name, species) {
        return db('birds')
            .then(collection => {
                return collection.insertOne({
                    name,
                    species
                });
            })
            .then(result => result.ops[0]);
    }

    get(id) {
        return db('birds')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
    }

    getAll() {
        return db('birds')
            .then(collection => {
                return collection.find();
            })
            .then(birdsDocObject => birdsDocObject.toArray());
    }

    update(id, name) {
        return db('birds')
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
        return db('birds')
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
        return db('birds').then(collection => collection.deleteMany());
    }
}
module.exports = new Birds();
