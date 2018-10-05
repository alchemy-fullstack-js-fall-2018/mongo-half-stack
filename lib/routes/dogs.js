const Dogs = require('../models/Dogs');
const notFound = require('./not-found');

const post = (req, res) => {
    const { name, breed } = req.body;
    Dogs.create(name, breed).then(res.send);
};

const get = (req, res) => {
    const { id } = req;
    if(id) {
        Dogs.get(id).then(res.send);
    } 
};

const methods = {
    post,
    get
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};
