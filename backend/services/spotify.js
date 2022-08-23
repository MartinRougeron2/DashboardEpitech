const db = require('../db');
const Service = db.service;

const widgetSpotifyMySongs = require('../widgets/spotify/models/widget_my_top_songs');
const widgetSpotifyRandom = require('../widgets/spotify/models/widget_new_music');
const widgetSpotifyFind = require("../widgets/spotify/models/widget_find_music");

const spotifyService = new Service({
    name: 'Spotify',
    description: 'Spotify is a Swedish music streaming service',
    token: null,
    refreshToken: null,
    expiresOn: 0,
    widgets: [],
    logoPath: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Spotify_App_Logo.svg',
    textColor: 'white'
});

spotifyService.widgets.push(widgetSpotifyMySongs);
spotifyService.widgets.push(widgetSpotifyRandom);
spotifyService.widgets.push(widgetSpotifyFind);

Service.findOneAndUpdate({name: spotifyService.name}, { $set: spotifyService }, { new: true });

module.exports = spotifyService;
