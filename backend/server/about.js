const { getServices } = require('./widgets');
const db = require('../db');
require('../services/spotify')
require('../services/spoonacular')
require('../services/unsplash')

exports.aboutJson = (req, res) => {
    const parseIp = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress
    let about = {
        client: {
            host: parseIp,
        },
        server: {
            current_time: Date.now(),
            services: [],
        },
    };

    db.service.find({}).populate('widgets').exec((err, serv) => {
        about.server.services = serv;
        // serv.forEach((service) => {
        //     about.server.services.push(service);
        // })
        res.status(200).send({about})
    });
}

/*
let about = {
        client: {
            host: "",
        },
        server: {
            current_time: 0,
            services : [],
        },
    };
*/
