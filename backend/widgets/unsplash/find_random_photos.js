const requestModule = require('request');
const widgetPhotoRandom = require('./models/widget_random_photo');
const querystring = require("querystring");
const saveParams = require('../saveParams')

module.exports = function (updateDict) {
    updateDict[widgetPhotoRandom.name] = function widgetRandom(request, response) {

        let params = request.query;

        console.log("search !", params);

        saveParams(params.id, params.options)
        params = JSON.parse(params.options);

        let uri = `${widgetPhotoRandom.baseRoute}?count=1&`;

        for (const property in params) {
            uri += querystring.stringify(JSON.parse(`{"${property}": "${params[property]}"}`)) + '&';
        }
        uri = uri.slice(0, -1);

        const options = {
            url: uri,
            headers: {
                'Authorization': 'Client-ID ' + process.env.UNSPLASH_CLIENT_ID
            },
            json: true
        }
        console.log(options);
        requestModule.get(options, (error, res, body) => {
            console.log('body ', body[0].width, body[0].height);
            const scale = body[0].height / body[0].width;
            const scale_ = body[0].width / body[0].height;
            if (error || !body) {
                response.status(body.status ?? 500).send({message: 'Error in GET: ' + body.error})
                return;
            }
            response.status(200).send({
                data: `<a target="_blank" href="${body[0].links.download}">
                            <img width="${250 * scale_}" height="${250 * scale}" alt="${body[0].description}" src=${body[0].links.download}></img>
                        </a>`
            })
        });
    };
}
