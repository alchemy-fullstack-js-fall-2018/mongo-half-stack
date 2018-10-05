const Rodents = require('../models/Rodents');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id  } = req;
    if(id) {
        const rodent = Rodents.get(id);
        res.end(JSON.stringify(rodent));
    } else {
        const rodents = Rodents.getAll();
        res.end(JSON.stringify(rodents));
    }
};

const post = (req, res) => {
    const { species, status } = req.body;
    Rodents.create(species, status).then(res.send);
};

const methods = {
    get,
    post
};

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};
