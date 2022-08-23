const {spotifyResponse, spotifyHeader} = require('./utils');
const requestModule = require('request');
const widgetSpotifyMySongs = require('./models/widget_my_top_songs');

module.exports = function(updateDict) {
    updateDict[widgetSpotifyMySongs.name] = function widgetSpotifyMySongsUpdate(request, response) {
        const params = JSON.parse(request.query.options);
        const time_range = params.time_range;

        let uri = `${widgetSpotifyMySongs.baseRoute}?limit=1&offset=${Math.floor(Math.random() * 50)}&time_range=${time_range}`;

        const options = {
            url: uri,
            headers: spotifyHeader(request),
            json: true
        }
        console.log('options', options);

        requestModule.get(options, (error, res, body) => {
            if (error) {
                response.status(error.statusCode).send({message: 'Error in GET: ' + error.message})
                return;
            }
            let data = spotifyResponse(res);
            error = data.error;
            let statusCode = data.statusCode;

            if (error) {
                response.status(statusCode ?? 500).send({message: 'update song ' + error});
                return;
            }
            console.log(body);
            let href = body.items[0].href.split('tracks/')[1];
            response.status(200).send({

                data: `<iframe src='https://open.spotify.com/embed/track/${href}' width='250' height='100' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>`
            })
        });
    };
}
