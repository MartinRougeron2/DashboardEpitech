const db = require('../db');
const saveInDB = require("./utils");
const Service = db.service;

const widgetUnpslashRandom = require('../widgets/unsplash/models/widget_random_photo');

const unsplashService = new Service({
    name: 'unsplash',
    description: 'Image API',
    token: null,
    refreshToken: null,
    expiresOn: 0,
    widgets: [],
    logoPath: 'https://findalt.b-cdn.net//wp-content/uploads/2020/11/Unsplash_Logo_600x600.png',
    textColor: 'white'
});

unsplashService.widgets.push(widgetUnpslashRandom);

saveInDB(Service, 'unsplash', unsplashService);


module.exports = unsplashService;
