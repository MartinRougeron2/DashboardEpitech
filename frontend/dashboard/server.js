const
    express = require('express'),
    serveStatic = require('serve-static'),
    history = require('connect-history-api-fallback'),
    port = process.env.PORT || 8000

const app = express();

console.log("frontend server launch in 3, 2, 1 !");

app.use(history());
app.use(serveStatic(__dirname + '/dist/spa'));
app.listen(port);
