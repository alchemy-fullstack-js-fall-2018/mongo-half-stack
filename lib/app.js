const { parse } = require('url');
const bodyParser = require('./body-parser');
const spies = require('./routes/spies');
const villains = require('./routes/villains');
const notFound = require('./routes/not-found');

const routes = {
    spies,
    villains
};

module.exports = (req, res) => {
    const url = parse(req.url);
    const parts = url.pathname.split('/').slice(1);

    res.setHeader('Content-Type', 'application/json');

    // /tweets/:id -> tweets
    const resource = parts[0];

    // routes.tweets
    const route = routes[resource] || notFound;
    req.id = parts[1];

    res.send = data => res.end(JSON.stringify(data));

    bodyParser(req).then(body => {
        req.body = body;
        route(req, res);
    });
};
