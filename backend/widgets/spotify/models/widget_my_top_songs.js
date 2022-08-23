const { Widget } = require('../../../db/widget');

const widgetSpotifyMySongs = new Widget({
    name: 'my-favorites-songs',
    verboseName: 'Top me !',
    description: 'show my favorite song',
    params: [{
        param: {value: '', name: 'time_range', required: false},
        possible_values: [
            {name: 'Short Time Range', value: 'short_term'},
            {name: 'Medium Time Range', value: 'medium_term'},
            {name: 'Long Time Range', value: 'long_term'}
        ]}],
    isSub: true,
    baseRoute: 'https://api.spotify.com/v1/me/top/tracks',
    needLogin: true,
    primaryColor: '#36c127',
    secondaryColor: '#ffffff',
    customRoutes: [],
    customResources: [],
    coverImage: 'https://9to5google.com/wp-content/uploads/sites/4/2021/06/photo_2021-06-25_13-18-49.jpg?quality=82&strip=all'
});

Widget.findOneAndUpdate({name: widgetSpotifyMySongs.name}, { $set: widgetSpotifyMySongs}, { new: true });

module.exports = widgetSpotifyMySongs;
