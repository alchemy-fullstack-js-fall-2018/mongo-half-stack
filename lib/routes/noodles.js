const Noodles = require('../models/Noodles');
const notFound = require('./routes/not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        const message = Noodles.get(id);
        res.send(message);
    } else {
        const messages = Noodles.getAll();
        res.send(messages);
    }    
};

// const post = (req, res) => {
//     const { name, location } = req.body;
//     const update = Noodles.createNewID(name, location);
//     res.send(update);
// };

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
    get
    // post,
    // delete: remove
};

module.exports = (req, res) => {
    // GET -> get
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};

