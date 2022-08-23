const {spotifyResponse, spotifyHeader} = require('./utils');
const requestModule = require('request');
const widgetSpotifyFind = require('./models/widget_find_music');
const querystring = require("querystring");
const saveParams = require('../saveParams')

module.exports = function (updateDict) {
    updateDict[widgetSpotifyFind.name] = function widgetSpotifySearchUpdate(request, response) {

        let params = request.query;

        console.log("search !", params);

        saveParams(params.id, params.options)
        params = JSON.parse(params.options);

        if (!params.q || params.q === "")
            return response.status(200).send({data: `<p>Please type something... </p>`});
        let uri = `${widgetSpotifyFind.baseRoute}?limit=1&`;

        for (const property in params) {
            uri += querystring.stringify(JSON.parse(`{"${property}": "${params[property]}"}`)) + '&';
        }

        const options = {
            url: uri,
            headers: spotifyHeader(request),
            json: true
        }
        console.log(options);
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
            console.log("search ! end")
            response.status(200).send({

                data: `<iframe src='https://open.spotify.com/embed/${params.type}/${href}' width='250' height='100' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>`
            })
        });
    };
}
