const db = require('../mongo-connection');
const { ObjectId } = require('mongodb');

class Spies {
    constructor() {
        this.spies = new Map();
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

    update(id, newWeapon, newVehicle) {

        

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

    delete() {

    }

    drop() {
        return db('spies').then(collection => collection.deleteMany());
    }
}

module.exports = new Spies();
