const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const db = require('../db');
const User = db.user;
const config = require('../server/config');
const { newToken, sendUserInfos} = require('./utils');
const {sendNewJwt} = require("./dashboard");

/*
* Check if user exists is in middleware
* Request if user want to create an account
* Send jwt token
*/
exports.signup = (req, res) => {
    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        res.send({token: newToken(user.id)});
    })
};

/*
* Request if username + password match
* if user not exists => 404
* if password is bad => 401
* send new Jwt token with user infos
*/
exports.signin = (req, res) => {
    User.findOne({
        name: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            if (!user) {
                return res.status(404).send({message: 'User Not found.'});
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Invalid Password!'
                });
            }
            sendNewJwt(req, res);
        });
};

exports.sendNewJwt = function (req, res) {
        let token = req.headers['x-access-token'];

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Unauthorized! Token' });
            }
            User.findById(decoded.id, (err, user) => {
                if (err) {
                    return res.status(500).send(err);
                }
                sendUserInfos(user.id, res);
            })
        });
}
