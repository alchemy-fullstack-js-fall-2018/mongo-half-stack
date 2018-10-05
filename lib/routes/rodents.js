const Rodents = require('../models/Rodents');
const notFound = require('./not-found');

const post = (req, res) => {
    const { species, status } = req.body;
    Rodents.create(species, status).then(res.send);
};

const methods = {
    post
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
