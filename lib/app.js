const { parse } = require('url');
const bodyParser = require('./body-parser');
const notFound = require('./routes/not-found');
const noodles = require('./routes/noodles');
const sushis = require('./routes/sushis');

const routes = {
    noodles,
    sushis
    //this posts it//
};

module.exports = (req, res) => {
    const url = parse(req.url, true);
    const parts = url.pathname.split('/').slice(1);

    res.setHeader('Content-Type', 'application/json');

    const resource = parts[0];
    req.id = parts[1];

    const route = routes[resource] || notFound;

    res.send = data => res.end(JSON.stringify(data));
    
    bodyParser(req)
        .then(body => {
            req.body = body;
            route(req, res);
        });
};

