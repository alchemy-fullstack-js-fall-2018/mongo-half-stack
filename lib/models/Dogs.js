const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Dogs {
    constructor() {
        this.dogs = new Map();
    }
}
