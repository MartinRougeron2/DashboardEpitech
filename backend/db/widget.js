const mongoose = require( 'mongoose');

const Param = new mongoose.Schema({
    value: String,
    name: String,
    required: {type: Boolean, required: false, default: true}
})

const WidgetSchema = new mongoose.Schema({
    name: {type: String, unique: true, dropDups: true},
    verboseName: String,
    description: String,
    params: [{param: Param, possible_values: [Param]}],
    isSub: Boolean,
    baseRoute: String,
    needLogin: Boolean,
    primaryColor: String,
    secondaryColor: String,
    refreshTime: {type: Number, default: 1000},
    coverImagePath: String,
    baseImagePath: String,
});

WidgetSchema.methods.setup = function (req, res) {
    console.log(this);
    Widget.findOne({id: this.id}).exec((err, widget) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (!widget) {
            return res.status(404).send({message: 'Widget Not found.'});
        }
        res.status(200).send({message: widget});
    })
};

// no global function for each widget
// WidgetSchema.methods.login;

// WidgetSchema.methods.updateWidget = function baseFunction() {};
WidgetSchema.methods.delete_ = function () {};


const Widget = mongoose.model('Widgets', WidgetSchema, 'widgets');

module.exports = {Widget, WidgetSchema, Param};
