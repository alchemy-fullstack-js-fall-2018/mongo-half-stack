const db = require('../mongo-connection');
const { ObjectId } = require('mongodb');

class Villains {
    constructor() {
        this.villains = new Map();
    }

    get(id) {
        return db('villains')
            .then(collection => collection.findOne({ _id: ObjectId(id) }));
    }

    getAll(query) {
        return db('villains')
            .then(collection => collection.find(query))
            .then(villainsDocObject => villainsDocObject.toArray());
    }

    create(data) {
        return db('villains')
            .then(collection => {
                return collection.insertOne({
                    name: data.name,
                    weapon: data.weapon,
                    motive: data.motive
                });
            })
            .then(result => result.ops[0]);
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
            .then(collection => collection.findOneAndDelete({ _id: ObjectId(id) }))
            .then(result => result.value);
    }

    drop() {
        return db('villains').then(collection => collection.deleteMany());
    }
}

module.exports = new Villains();
