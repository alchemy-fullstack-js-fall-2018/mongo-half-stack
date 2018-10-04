const http = require('http')
const router = require('./routes/router');

const resources = {};
const middleware = [];

const resource = (model, path) => {
    let name = path || model.constructor.name.toLowerCase();
    resources[name] = model;
};

const applyMiddleware = m => {
    middleware.push(m);
};

const handleMiddleware = (req, res) => {
    return Promise.all(middleware.map(m => {
        m(req, res);
    }));
};

const requestHandler = (req, res) => {
    handleMiddleware(req, res).then(() => {
        router(resources, req, res);
    });
};

const start = (port) => {
    const server = http.createServer(requestHandler);

    server.listen(port, () => {
        console.log('server running on', server.address().port);
    });
};

module.exports = {
    use: applyMiddleware,
    resource,
    start
};
