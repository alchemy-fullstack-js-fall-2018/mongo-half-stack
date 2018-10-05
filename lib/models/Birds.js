const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Birds {
    constructor() {
        this.birds = new Map();
    }
}
