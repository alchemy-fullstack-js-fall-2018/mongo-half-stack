const db = require('../mongo-connection');
const { ObjectId } = require('mongodb');

class Spies {
    constructor() {
        this.spies = new Map();
    }

    get(id) {
        return db('spies')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
    }

    getAll() {
        return db('spies')
            .then(collection => {
                return collection.find();
            })
            .then(spiesDocObject => spiesDocObject.toArray());
    }

    create(name, weapon, vehicle) {
        return db('spies')
            .then(collection => {
                return collection.insertOne({
                    name,
                    weapon,
                    vehicle
                });
            })
            .then(result => result.ops[0]);
    }

    update(id, data) {

        return db('spies')
            .then(collection => {
                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) }, 
                    {
                        $set: {
                            weapon: data.weapon,
                            vehicle: data.vehicle
                        }
                    },
                    { returnOriginal: false }
                );
            })
            .then(result => result.value);
    }

    delete(id) {

        return db('spies')
            .then(collection => {
                return collection.findOneAndDelete({ _id: ObjectId(id) });
            })
            .then(result => result.value);
    }

    drop() {
        return db('spies').then(collection => collection.deleteMany());
    }
}

module.exports = new Spies();
