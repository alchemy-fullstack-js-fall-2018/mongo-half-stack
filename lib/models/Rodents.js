const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Rodents {
    constructor() {
        this.rodents = new Map();
    }
    
    create(species, status) {
        return db('Rodents')
            .then(collection => {
                return collection.insertOne({
                    species,
                    status
                });
            })
            .then(result => result.ops[0]);
    }

    get(id) {
        console.log(id);
        return db('Rodents') 
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
    }

    getAll() {
        return db('Rodents')
            .then(collection => {
                return collection.find();
            })
            .then(rodentsDocObject => rodentsDocObject.toArray());
    }

    update(id, status) {
        return db('Rodents')
            .then(collection => {
                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) },
                    { $set: status },
                    { returnOriginal: false }
                );
            })
            .then(res => res.value);
    }

    sortR() {
        return db('Whales').then(collection => collection.sort((a, b) => {
            return a._id - b._id;
        }));
    }

    delete(id) {
        return db('Rodents')
            .then(collection => {
                return collection.deleteOne({ _id: ObjectId(id) });
            })
            .then(result => {
                if(result.deletedCount > 0) return { removed: true };
                else return { removed: false };
            });           
    }

    drop() {
        return db('Rodents').then(collection => collection.deleteMany());
    }

    
}

module.exports = new Rodents();
