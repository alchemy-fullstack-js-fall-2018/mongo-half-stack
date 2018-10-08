const { parse } = require('url');
const bodyParser = require('./body-parser');
const authors = require('./routes/authors');
const books = require('./routes/books');
const notFound = require('./routes/not-found');

const routes = {
    authors,
    books
};

module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send = data => res.end(JSON.stringify(data));

    const url = parse(req.url);
    const parts = url.pathname.split('/');
    const resource = parts[1];
    req.id = parts[2];

    const route = routes[resource] || notFound;
   
    bodyParser(req).then(body => {
        req.body = body;
        route(req, res);
    });
};
