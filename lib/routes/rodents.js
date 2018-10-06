const Rodents = require('../models/Rodents');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id  } = req;
    if(id) {
        Rodents.get(id).then(res.send);
    } else {
        Rodents.getAll().then(res.send);
    }
};

const post = (req, res) => {
    const { species, status } = req.body;
    Rodents.create(species, status).then(res.send);
};

const destroy = (req, res) => {
    const { id } = req;
    Rodents.delete(id)
        .then(res.send);
};

const methods = {
    get,
    post,
    delete: destroy
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
