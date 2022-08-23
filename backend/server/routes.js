const { authJwt, verifySignUp } = require('../midleware');
const { signup, signin, sendNewJwt } = require('../auth/dashboard');
const { signWithGoogle, redirectToSpotify, getSpotifyAccessToken } = require('../auth/oauth');
const { Widget } = require('../db/widget');
const { getWidgets, addWidgets, removeWidgets } = require('./widgets');
const { aboutJson } = require('./about');
const { getServices } = require('../services/index');
var updateDict = {};
require('../widgets')(updateDict);

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.json({ message: 'Welcome to Dashboard application.' });
    });


    app.get('/api/test/user', [authJwt.verifyToken], (req, res) => {
        res.status(200).send({ message: 'User token is valid' })
    });

    app.get('/about.json', [], aboutJson);

    app.post('/api/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail], signup);

    app.post('/api/auth/signin', signin);

    app.post('/api/auth/signWithGoogle', signWithGoogle);

    app.post('/api/auth/refreshToken', (req, res) => sendNewJwt(req, res));


    app.get('/api/services', [authJwt.verifyToken], getServices);

    app.get('/api/services/widgets', [authJwt.verifyToken], getWidgets);

    app.post('/api/widget/add', [authJwt.verifyToken], addWidgets);

    app.post('/api/widget/remove', [authJwt.verifyToken], removeWidgets);

    Widget.find({}, function (err, widgets) {
        widgets.forEach(function (widget) {
            app.get(`/api/widget/${widget.name}/init/`, [authJwt.verifyToken], widget.setup);
            app.get(`/api/widget/${widget.name}/update/`, [authJwt.verifyToken], updateDict[widget.name]);
        });
    });

    app.get('/login-spotify', redirectToSpotify);

    app.get('/spotify-callback', getSpotifyAccessToken);

};
