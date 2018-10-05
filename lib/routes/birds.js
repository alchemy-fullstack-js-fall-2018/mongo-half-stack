const Birds = require('../models/Birds');
const notFound = require('./not-found');

const post = (req, res) => {
    const { name, species } = req.body;
    Birds.create(name, species).then(res.send);
};

const get = (req, res) => {
    const { id } = req;
    if(id) {
        Birds.get(id).then(res.send);
    } else {
        Birds.getAll().then(res.send);
    }
};

const put = (req, res) => {
    const { id } = req;
    const name = req.body;
    Birds.update(id, name)
        .then(res.send);
};

const del = (req, res) => {
    const { id } = req;
    Birds.delete(id)
        .then(res.send);
};

const methods = {
    post,
    get,
    put,
    delete: del
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};

