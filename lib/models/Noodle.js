const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Noodle {
    constructor() {
        this.noodle = new Map();
    }  

    create(name, location) {
        return db('restaurants')
            .then(collection => {
                return collection.insertOne({
                    name, 
                    location
                });
            })
            .then(result => result.ops[0]);
    }

    get(id) {
        return db('restaurants')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
    }

    getAll() {
        return db('restaurants')
            .then(collection => {
                return collection.find();    
            })
            .then(restaurantsDocObject => restaurantsDocObject.toArray());
    }

    update(id, name) {
        return db('restaurants')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            })
            .then(collection => {
                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) },
                    { $set: name },
                );
            })
            .then(res => res.value);
    }


    drop() {
        return db('restaurants').then(collection => collection.deleteMany());
    }

    delete(id, name) {
        return db('restaurants')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            })
            .then(collection => {
                return collection.remove(
                    { _id: ObjectId(id) },
                    { $set: name },
                );
            })
            .then(res => res.value);
    }
    
    
}

module.exports = new Noodle();
