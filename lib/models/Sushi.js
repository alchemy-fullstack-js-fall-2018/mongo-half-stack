require('dotenv').config();
const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Sushi {
    constructor() {
        this.sushi = new Map();
    }  

    create(name, location) {
        return db('sushis')
            .then(collection => {
                return collection.insertOne({
                    name, 
                    location
                });
            })
            .then(result => result.ops[0]);
    }

    get(id) {
        return db('sushis')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
    }

    getAll() {
        return db('sushis')
            .then(collection => {
                return collection.find();    
            })
            .then(restaurantsDocObject => restaurantsDocObject.toArray());
    }

    update(id, name) {
        return db('sushis')
            .then(collection => {
                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) },
                    { $set: { name: name } },
                    { returnOriginal: false }
                );
            })
            .then(res => res.value);
    }

    drop() {
        return db('sushis').then(collection => collection.deleteMany());
    }

    delete(id) {
        return db('sushis')
            .then(collection => {
                return collection.deleteOne(
                    { _id: ObjectId(id) }
                );
            })
            .then(res => ({ removed: res.deletedCount > 0 }));
    }    
}

module.exports = new Sushi();
