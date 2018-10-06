const Spies = require('../models/Spies');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id, query } = req;
    if(id) Spies.get(id).then(res.send);
    else Spies.getAll(query).then(res.send);
};

const post = (req, res) => {
    const data = req.body;
    Spies.create(data).then(res.send);
};

const put = (req, res) => {
    const { id } = req;
    const data = req.body;
    Spies.update(id, data).then(res.send);
};

const remove = (req, res) => {
    const { id } = req;
    Spies.delete(id).then(res.send);
};

const methods = {
    get,
    post,
    put,
    delete: remove
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
