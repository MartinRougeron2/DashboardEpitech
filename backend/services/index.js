const db = require('../db');
require('./spotify')
require('./spoonacular')
require('./unsplash')

exports.getServices = (req, res) => {
    db.service.find({}).populate('widgets').exec((err, services) => {
            res.status(200).send({
                services: services
            })
    });
}
