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
        return db('Rodents') 
            .then(collection => {
                // console.log(ObjectId(id));
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
    //findoneanddelete

    // update(id) {
    //     return db('Rodents')
    //         .then(collection => {
    //             return collection.
    //         })
    // }


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
