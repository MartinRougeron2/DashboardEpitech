const mongoose = require('mongoose');

async function run() {
    try {
        await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
            console.log('Connected successfully to server');
        });
    } catch (error) {
        console.error(error);
    }
}
run().catch(console.dir);
mongoose.Promise = global.Promise;

const db = {};

require('../widgets');

db.mongoose = mongoose;
db.user = require('./user').User;
db.service = require('./service').Service;
db.widget = require('./widget').Widget;
db.widgetParams = require('./widgetParams').WidgetParams;

module.exports = db;
