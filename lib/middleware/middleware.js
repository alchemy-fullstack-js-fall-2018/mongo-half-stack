const { parse } = require('url');
const bodyParser = require('../body-parser');

module.exports = {
    bodyParser(req) {
        return bodyParser(req).then(body => req.body);
    },

    jsonHeader(req, res) {
        res.setHeader('Content-Type', 'application/json');
    },

    requestLogger(req) {
        const url = parse(req.url);
        console.log(req.method, url.pathname);
    },

    responseBodySend(req, res) {
        res.send = data => res.end(JSON.stringify(data));
    },

    resourceHandler(req) {
        const url = parse(req.url);
        const parts = url.pathname.split('/').slice(1);
        req.resource = parts[0];
        req.id = parts[1];
    }
}
