const db = require('../db');

exports.getWidgets = (req, res) => {
    db.widget.find(function (err, widgets) {
        res.status(200).json({ widgets: widgets });
    });
};

exports.saveParamWidget = (id, params) => {

    db.widgetParams.findByIdAndUpdate(
        { _id: id },
        { params: params },
    );
}

exports.addWidgets = (req, res) => {
    db.user.findById(req.body.id, async (err, user) => {
        console.log(user);
        db.widget.findById(req.body.widget._id, (err, widget) => {
            console.log(widget._id);
            const newWidget = new db.widgetParams({widget: widget._id, params: []});
            newWidget.save();
            user.widgetParams.push(newWidget);
            user.save();
            widget._id = newWidget._id;
            res.status(200).send({widget: widget});
        })
    })
};

exports.removeWidgets = (req, res) => {
    console.log(req.body)
    db.user.findById(req.body.id, async (err, user) => {
        if (err) {
            return res.status(500).send({message: 'db err'});
        }
        user.widgetParams.pull(req.body.widget);
        user.save();
        res.status(200).send({message : 'Removed !'});
    })
};