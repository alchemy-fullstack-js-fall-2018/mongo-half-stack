const Spies = require('../models/Spies');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        const spy = Spies.get(id);
        if(spy) res.send(spy);
        else notFound(req, res);
        //res.end(JSON.stringify(spy));
    } 
    else {
        const spies = Spies.getAll();
        res.send(spies);
        //res.end(JSON.stringify(spies));
    }
};

const post = (req, res) => {
    const data = req.body;
    const spy = Spies.create(data);
    res.send(spy);
    // res.end(JSON.stringify(spy));
};

const put = (req, res) => {
    const { id } = req;
    const data = req.body;
    const spy = Spies.update(id, data);
    res.send(spy);
    // res.end(JSON.stringify(spy));
};

const remove = (req, res) => {
    const { id } = req;
    const spy = Spies.delete(id);
    res.send(spy);
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
