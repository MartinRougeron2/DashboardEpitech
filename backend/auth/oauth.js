const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const querystring = require('querystring');
const {OAuth2Client} = require('google-auth-library');
const request = require('request');

const {User} = require('../db/user');
const {sendUserInfos} = require("./utils");
const jwt = require("jsonwebtoken");
const config = require("../server/config");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


/*
* send google id + email
* if not match send 403
* if user not exists create one on fly
* send Jwt token
*/
exports.signWithGoogle = (req, res) => {

    async function verify() {
        console.log(req.body)
        const ticket = await client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log(payload);

        if (req.body.email !== payload.email) {
            console.log('bad request in google auth')
            return res.status(403).send({message: 'Stop joking with us.'});
        }
        console.log('fetching server to find user attched to ' + req.body.email)
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            console.log('Server fetched')
            if (err) {
                console.error('Bad request: ' + err)
                res.status(500).send({message: err});
                return;
            }
            if (!user) {
                console.log('user not exists');
                user = new User({
                    name: req.body.email,
                    email: req.body.email,
                    password: bcrypt.hashSync(crypto.randomBytes(64).toString('hex'), 8)
                });
                user.save((err, user) => {
                    sendUserInfos(user._id, res);
                });
            }
            sendUserInfos(user._id, res);
        })
    }

    verify();
};

function generateRandomString(number) {
    return crypto.randomBytes(number).toString('hex');
}

exports.redirectToSpotify = function (req, res) {
    const client_id = '93dfa08b765942e4a0e3519f825c7099';
    const redirect_uri = 'http://localhost:8080/spotify-callback';
    const scope = 'user-read-private user-read-email user-top-read streaming app-remote-control user-read-playback-state user-modify-playback-state';
    const d = new Date();
    const state = jwt.sign({day: d.getDay(), month: d.getMonth()}, config.secret, {
        expiresIn: 86400 // 24 hours
    });

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
        }));
}

exports.getSpotifyAccessToken = function (req, res) {
    const client_id = '93dfa08b765942e4a0e3519f825c7099';
    const code = req.query.code || null;
    const state = req.query.state || null;
    let dd = {};

    jwt.verify(state, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({message: 'Unauthorized!, Dashboard Token error'});
        }
        dd = decoded;
    });

    const d = new Date();
    if (d.getDay() !== dd.day && dd.month !== d.getMonth()) {
        return;
    }

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: 'http://localhost:8080/spotify-callback',
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + process.env.SPOTIFY_SECRET).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        const access_token = body.access_token,
            refresh_token = body.refresh_token;

        res.redirect('http://localhost:8000' + '/success-spotify?' +
            querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token
            }));
    })
}