const Dogs = require('../models/Dogs');
const notFound = require('./not-found');

const post = (req, res) => {
    const { name, breed } = req.body;
    const dog = Dogs.create(name, breed)
    // .then(res => {
    //     res.send(dog);
    // }); 
    res.send(dog);
};

const methods = {
    post
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};
