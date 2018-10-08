const { parse } = require('url');
const bodyParser = require('./body-parser');
const router = require('./routes/router');
const notFound = require('./routes/not-found');

const resources = ['Spies', 'Villains'];

module.exports = (req, res) => {
    const url = parse(req.url, true);
    const parts = url.pathname.split('/').slice(1);
    
    req.query = url.query;
    res.setHeader('Content-Type', 'application/json');
    
    const resource = parts[0];
    req.resource = resource.replace(/^[a-zA-Z]/, match => match.toUpperCase());
    
    req.id = parts[1];
    
    res.send = data => res.end(JSON.stringify(data));

    bodyParser(req).then(body => {
        req.body = body;
        resources.includes(req.resource) ? router(req, res) : notFound(req, res);
    });
};
