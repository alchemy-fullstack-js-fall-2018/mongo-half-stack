const Books = require('../models/Books');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        Books.get(id).then(res.send);
    }
    else {
        Books.getAll().then(res.send);
    }
};

const post = (req, res) => {
    const { title, genre } = req.body;
    Books.create(title, genre)
        .then(res.send);
};

const del = (req, res) => {
    const { id } = req;
    Books.delete(id)
        .then(res.send);
};

const put = (req, res) => {
    const newContent = req.body;
    const { id } = req;
    Books.update(id, newContent)
        .then(res.send);
};

const methods = {
    post,
    get,
    delete: del,
    put
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
