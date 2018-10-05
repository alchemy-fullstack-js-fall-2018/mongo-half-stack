// villains have name, weapon, and motive


const { ObjectId } = require('mongodb');

class Villains {
    constructor(db) {
        this.db = db;
    }
}

module.exports = Villains;
