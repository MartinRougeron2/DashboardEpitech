const mongoose = require('mongoose');
const {ServiceSchema} = require('./service');
const {widgetParamsSchema} = require('./widgetParams');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    services:  [{ type: mongoose.Types.ObjectId, ref: mongoose.model('Service', ServiceSchema) }],
    widgetParams:  [{ type: mongoose.Types.ObjectId, ref: mongoose.model('WidgetParams', widgetParamsSchema)}],
});

const User = mongoose.model('User', UserSchema);

module.exports = {User, UserSchema};
