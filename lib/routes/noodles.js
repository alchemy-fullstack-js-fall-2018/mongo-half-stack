const Noodles = require('../models/Noodle');
const notFound = require('./routes/not-found');

const get = (req, res) => {
    const { id } = req;
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

// const remove = (req, res) => {
//     const { id } = req;
//     Noodles.delete(id);
//     res.send({ deleted: true });
// };

// const put = (req, res) => {
//     const { id } = req;
//     const {  } = req;
// };
const methods = {
    get,
    post
    // delete: remove
};

module.exports = (req, res) => {
    // GET -> get
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};

