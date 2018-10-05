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

    update(id, data) {

        return db('villains')
            .then(collection => {
                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) }, 
                    {
                        $set: {
                            weapon: data.weapon,
                            motive: data.motive
                        }
                    },
                    { returnOriginal: false }
                );
            })
            .then(result => result.value);
    }

    delete(id) {

        return db('villains')
            .then(collection => {
                return collection.findOneAndDelete({ _id: ObjectId(id) });
            })
            .then(result => result.value);
    }

    drop() {
        return db('villains').then(collection => collection.deleteMany());
    }
}

module.exports = new Villains();
