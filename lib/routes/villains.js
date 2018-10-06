const Villains = require('../models/Villains');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id, query } = req;
    if(id) Villains.get(id).then(res.send);
    else Villains.getAll(query).then(res.send);
};

const post = (req, res) => {
    const data = req.body;
    Villains.create(data).then(res.send);
};

const put = (req, res) => {
    const { id } = req;
    const data = req.body;
    Villains.update(id, data).then(res.send);
};

const remove = (req, res) => {
    const { id } = req;
    Villains.delete(id).then(res.send);
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
