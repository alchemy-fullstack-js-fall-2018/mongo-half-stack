/* eslint no-console: off */
require('dotenv').config();
const db = require('./lib/mongo-connection');
const app = require('./lib/app');
const middleware = require('./lib/middleware/middleware');
const Tweets = require('./lib/models/tweets');

app.use(middleware.jsonHeader);
app.use(middleware.requestLogger);
app.use(middleware.responseBodySend);
app.use(middleware.resourceHandler);
app.use(middleware.bodyParser);

app.resource(new Tweets(db));

app.start(7890);
