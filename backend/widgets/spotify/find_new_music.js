const {randomSearchUri, spotifyResponse, spotifyHeader} = require('./utils');
const requestModule = require('request');
const widgetSpotifyRandom = require('./models/widget_new_music');

module.exports = function (updateDict) {
    updateDict[widgetSpotifyRandom.name] = function widgetSpotifyRandomUpdate(request, response) {
        const params = JSON.parse(request.query.options);
        console.log('params', params)
        const uri = randomSearchUri(widgetSpotifyRandom.baseRoute, params);

        const options = {
            url: uri,
            headers: spotifyHeader(request),
            json: true
        }
        requestModule.get(options, (error, res, body) => {
            let statusCode;
            if (error) {
                response.status(error.statusCode).send({message: 'Error in GET: ' + error.message})
                return;
            }
            let data = spotifyResponse(res);
            error = data.error;
            statusCode = data.statusCode;

            if (error) {
                return response.status(statusCode ?? 400).send({message: 'update song ' + error});
            }

            let href;


            if (params.type === 'track') {
                href = body.tracks.items[0].href.split('tracks/')[1];
            } else if (params.type === 'artist') {
                href = body.artists.items[0].href.split('artists/')[1];
            }

            response.status(200).send({

                data: `<iframe src='https://open.spotify.com/embed/${params.type}/${href}' width='250' height='100' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>`
            })
        });
    };
}
