const Rodents = require('../models/Rodents');
const notFound = require('./not-found');

const post = (req, res) => {
    const { species, status } = req.body;
    const rodent = Rodents.create(species, status);
    res.send(rodent);
};

const methods = {
    post
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
