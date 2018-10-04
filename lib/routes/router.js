const notFound = require('./not-found');

const get = (resource, req, res) => {
    const { id } = req;
    if(id) {
        console.log(id)
        const item = resource.findById(id);
        item.then(res.send);
    } else {
        const items = resource.find({});
        items.then(res.send);
    }
};

const post = (resource, req, res) => {
    const item = resource.insert(req.body);
    item.then(res.send);
};

const methods = {
    get,
    post
};

module.exports = (resources, req, res) => {
    const resourceModel = resources[req.resource];
    if(!resourceModel) return notFound(req, res);
    
    const method = methods[req.method.toLowerCase()] || notFound;
    method(resourceModel, req, res);
};
