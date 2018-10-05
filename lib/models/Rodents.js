const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Rodents {
    constructor() {
        this.rodents = new Map();
    }
    
    create(species, status) {
        return db('rodents')
            .then(collection => {
                return collection.insertOne({
                    species,
                    status
                });
            })
            .then(result => result.ops[0]);
    }
};

module.exports = new Rodents();
