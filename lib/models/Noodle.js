const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Noodle {
    constructor() {
        this.noodle = new Map();
    }  

    createNewId(name, location) {
        return db('restaurants')
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

    
    // get(id) {
    //     return db('restaurants')
    //         .then(collection => {
    //             return collection.findOne({ _id: ObjectId(id) });
    //         });

    // }

    // getAll() {
    //     return [...this.noodle.values()];
    // }

    // update(id, newText) {
    //     const restaurant = this.noodle.get(id);
    //     restaurant.text = newText;
    //     return restaurant;
    // }

    // delete(id) {
    //     this.noodle.delete(id);
    // }
    
}

module.exports = new Noodle();
