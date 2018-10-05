const db = require('../mongo-connection');
const { ObjectId } = require('mongodb');

class Villains {
    constructor() {
        this.villains = new Map();
    }

    create(name, weapon, motive) {
        return db('villains')
            .then(collection => {
                return collection.insertOne({
                    name,
                    weapon,
                    motive
                });
            })
            .then(result => result.ops[0]);
    }

    get(id) {
        return db('villains')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
    }

    getAll() {
        return db('villains')
            .then(collection => {
                return collection.find();
            })
            .then(villainsDocObject => villainsDocObject.toArray());
    }

    drop() {
        return db('villains').then(collection => collection.deleteMany());
    }
}

module.exports = new Villains();
