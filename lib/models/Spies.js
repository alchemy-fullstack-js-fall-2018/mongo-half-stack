// Spies have weapon, vehicle, and name


const { ObjectId } = require('mongodb');

class Spies {
    constructor(db) {
        this.db = db;
    }

}

module.exports = Spies;
