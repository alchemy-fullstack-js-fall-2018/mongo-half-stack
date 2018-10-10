const Noodles = require('../models/Noodle');
const notFound = require('./not-found');

const get = (req, res) => {
    const id = req.id;
    if(id) {
        Noodles.get(id).then(res.send);
    } else {
        Noodles.getAll().then(res.send);
    }    
};

const post = (req, res) => {
    const { name, location } = req.body;
    Noodles.create(name, location).then(res.send);
};

const remove = (req, res) => {
    const id = req.id;
    Noodles.delete(id).then(res.send);
};

const put = (req, res) => {
    const id = req.id;
    const name = req.body;
    Noodles.update(id, name.name)
        .then(res.send);
};
const methods = {
    get,
    post,
    put,
    delete: remove
};

module.exports = (req, res) => {
    // GET -> get
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};

