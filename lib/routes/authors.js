const Authors = require('../models/Authors');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        Authors.get(id).then(res.send);
    }
    else {
        Authors.getAll().then(res.send);
    }
};

const post = (req, res) => {
    const { firstName, lastName } = req.body;
    Authors.create(firstName, lastName)
        .then(res.send);
};

const methods = {
    post,
    get
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};