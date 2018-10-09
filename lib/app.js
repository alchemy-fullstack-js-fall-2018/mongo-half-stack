const { parse } = require('url');
const bodyParser = require('./body-parser');
const notFound = require('./routes/not-found');
const noodles = require('./routes/Noodles');

const routes = {
    noodles
    //this posts it//
};

module.exports = (req, res) => {
    const url = parse(req.url, true);
    const parts = url.pathname.split('/').slice(1);

    res.setHeader('Content-Type', 'application/json');

    const resource = parts[0];

    const route = routes[resource] || notFound;

    res.send = data => res.end(JSON.stringify(data));
    
    bodyParser(req)
        .then(body => {
            req.body = body;
            route(req, res);
        });
};

