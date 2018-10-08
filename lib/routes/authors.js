const Authors = require('../models/Authors');
const notFound = require('./not-found');

const post = (req, res) => {
    const { firstName, lastName } = req.body;
    Authors.create(firstName, lastName)
        .then(res.send);
};


const methods = {
    post
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
