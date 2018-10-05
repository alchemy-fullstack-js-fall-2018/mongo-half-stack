const Villains = require('../models/Villains');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        const villain = Villains.read(id);
        if(villain) res.send(villain);
        else notFound(req, res);
    } 
    else {
        const villains = Villains.readAll();
        res.send(villains);
    }
};

const post = (req, res) => {
    const data = req.body;
    const villain = Villains.write(data);
    res.send(villain);
};

const put = (req, res) => {
    const { id } = req;
    const data = req.body;
    const villain = Villains.modify(id, data);
    res.send(villain);
};

const remove = (req, res) => {
    const { id } = req;
    const villain = Villains.delete(id);
    res.send(villain);
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
