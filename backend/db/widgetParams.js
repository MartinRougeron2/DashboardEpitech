const mongoose = require('mongoose');
const {WidgetSchema, Param} = require('./widget');

const widgetParamsSchema = new mongoose.Schema({
    widget:  { type: mongoose.Types.ObjectId, ref: mongoose.model('Widgets', WidgetSchema)},
    params: [Param],
});

const WidgetParams = mongoose.model('WidgetParams', widgetParamsSchema, 'widgetparams');

module.exports = {WidgetParams, widgetParamsSchema};
