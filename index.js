require('dotenv').config();
const app = require('./lib/app');
const http = require('http');

const server = http.createServer(app);

const PORT = 9999;

server.listen(PORT, () => { /* eslint-disable-next-line no-console */
    console.log('server running on ', server.address().port);
});
