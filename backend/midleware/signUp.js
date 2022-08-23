const db = require('../db');
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    console.log('Searching in db ...')
    User.findOne({
        name: req.body.username
    }).exec((err, user) => {
        if (err) {
            console.error('error in exec')
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            console.error('username already in use');
            res.status(400).send({ message: 'Failed! Username is already in use!' });
            return;
        }

        // Email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                console.error('error in exec')
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                console.error('error email already in use')
                res.status(400).send({ message: 'Failed! Email is already in use!' });
                return;
            }

            next();
        });
    });
};


module.exports = { checkDuplicateUsernameOrEmail };