const { Widget } = require('../../../db/widget');

const widgetSpotifyRandom = new Widget({
    name: 'random-music',
    verboseName: 'Find what you want !',
    description: 'get a random artist or a random song',
    possible_values: [],
    params: [
        {param: {value: '1', name: 'limit', required: false}, possible_values: []},
        {param: {value: '', name: 'type', required: true},
        possible_values: [
            {value: 'Artist', name: 'artist'},
            {value: 'Song', name: 'track'},
        ]}
    ],
    isSub: true,
    baseRoute: 'https://api.spotify.com/v1/search',
    needLogin: true,
    primaryColor: '#36c127',
    secondaryColor: '#ffffff',
    customRoutes: [],
    customResources: [],
    coverImagePath: 'https://9to5google.com/wp-content/uploads/sites/4/2021/06/photo_2021-06-25_13-18-48.jpg'
})

Widget.findOneAndUpdate({name: widgetSpotifyRandom.name}, { $set: widgetSpotifyRandom.toJSON()}, { new: true });

module.exports = widgetSpotifyRandom;
