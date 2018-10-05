const db = require('../mongo-connector');
// const { a } = require('mongodb');
const Restaurant = require('./restaurant');

const { ObjectId } = require('mongodb');

class Noodles {
    constructor() {
        this.noodles = new Map();
    }  

    createNewId(name, location) {
        return db('restaurant location')
            .then(collection => {
                return collection.insertOne({
                    name, 
                    location
                });
            })
            .then(result => result.ops[0]);
    }
    // const restaurant = new Restaurant(name, location);
    // this.noodles.set(restaurant.id, restaurant);
    // return restaurant;

    
    get(id) {
        return this.noodles.get(id);
    }

    getAll() {
        return [...this.noodles.values()];
    }

    update(id, newText) {
        const restaurant = this.noodles.get(id);
        restaurant.text = newText;
        return restaurant;
    }

    delete(id) {
        this.noodles.delete(id);
    }
    
}

module.exports = new Noodles();
