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

const put = (req, res) => {
    const { id } = req;
    const status = req.body;
    Whales.update(id, status)
        .then(res.send);
};

const destroy = (req, res) => {
    const { id } = req;
    Whales.delete(id)
        .then(res.send);
};

const methods = {
    get,
    post,
    put,
    delete: destroy
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
