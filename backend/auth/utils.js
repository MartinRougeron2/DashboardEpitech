const jwt = require('jsonwebtoken');
const config = require('../server/config');
const {User} = require("../db/user");
const {Service} = require("../db/service");

function newToken(userId) {
    return jwt.sign({id: userId}, config.secret, {
        expiresIn: 86400 // 24 hours
    });
}

async function sendUserInfos(userId, res) {
    const _newToken = newToken(userId);
    Service.find({}).populate({path: 'widgets'})
        .exec((err, services) => {
            User.findOne({_id: userId}).populate({path: 'widgetParams', populate: {path: 'widget', model: 'Widgets'}})
                .exec(async (err, user) => {

                    if (err) {
                        console.log(err);
                        res.status(500).send({message: err});
                        return;
                    }

                    if (!user) {
                        return res.status(404).send({message: 'User Not found.'});
                    }

                    const dictWidgetService = {};
                    services.forEach(service => {
                        service.widgets.forEach(w => {
                            dictWidgetService[w._id] = service;
                        });
                    });

                    const widgets = user.widgetParams.map(wp => {

                        return {
                            widget: wp.widget,
                            service: dictWidgetService[wp.widget._id],
                            params: wp.params,
                            _id: wp._id
                        }
                    });

                    res.status(200).send({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        widgets: widgets,
                        token: _newToken
                    });
                });
        });
}

module.exports = {newToken, sendUserInfos}