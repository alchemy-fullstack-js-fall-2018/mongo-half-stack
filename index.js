
/* eslint no-console: off */

require('dotenv').config();
const app = require('./lib/app');
const http = require('http');

const server = http.createServer(app);

const PORT = 9111;

server.listen(PORT, () => {
    console.log('server is running ', server.address().port);
});
