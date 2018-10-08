const Whales = require('../models/Whales');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        Whales.get(id).then(res.send);
    } else {
        Whales.getAll().then(res.send);
    }    
};

const post = (req, res) => {
    const { species, status } = req.body;
    Whales.create(species, status).then(res.send);
};

const methods = {
    get,
    post
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
