const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

var app = express();

require('dotenv').config()

require('../db');

require('../auth/utils');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    );
    next();
});
app.use(
    cors({
        origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:8000']
    })
);

Sentry.init({
    dsn: "https://08c752e1365d4fdda743bd29180daad2@o1084397.ingest.sentry.io/6094177",
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

require('./routes')(app);

app.use(Sentry.Handlers.errorHandler());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
