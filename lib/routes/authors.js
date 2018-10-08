const Authors = require('../models/Authors');
const notFound = require('./not-found');

const post = (req, res) => {
    const { firstName, lastName } = req.body;
    const author = Authors.create(firstName, lastName);
    res.send(author);
};


const methods = {
    post
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
