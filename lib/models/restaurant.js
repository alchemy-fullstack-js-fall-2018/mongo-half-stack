const uuid = require('uuid/v4');

module.exports = class Restaurant {
    constructor(name, location) {
        this.id = uuid();
        this.name = name;
        this.location = location;
    }
};
