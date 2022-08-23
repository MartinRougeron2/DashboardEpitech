const mongoose = require( 'mongoose');
const {WidgetSchema} = require('./widget');

const ServiceSchema = new mongoose.Schema({
    name: String,
    description: String,
    token: String,
    refreshToken: String,
    expiresOn: Number,
    widgets:  [{ type: mongoose.Types.ObjectId, ref: mongoose.model('Widgets', WidgetSchema)}],
    logoPath: String,
    textColor: String,
});

const Service = mongoose.model('Services', ServiceSchema);

module.exports = {Service, ServiceSchema};
