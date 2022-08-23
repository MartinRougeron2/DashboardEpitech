const querystring = require('querystring');

exports.randomSearchUri = function (baseRoute, params) {
    let characters       = 'abcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    let result           = characters.charAt(Math.floor(Math.random() * charactersLength));
    const jsonParams = params;

    let uri = `${baseRoute}?type=${jsonParams.type}&q=${result}&offset=${Math.floor(Math.random() * 1000)}&`;

    for (const property in jsonParams) {
        console.log("prop: ", property)
        uri += querystring.stringify(JSON.parse(`{"${property}": "${jsonParams[property]}"}`));
    }
    return uri;
}

exports.spotifyResponse = function (response) {
    const {statusCode} = response;
    const contentType = response.headers['content-type'];

    let error;
    if (statusCode !== 200) {
        error = new Error(`Spotify Request Failed. Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type. Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        response.resume();
        return {response, error, statusCode};
    }
    return {response, error, statusCode};
}

exports.spotifyHeader = function (request) {
    return {
        Authorization: 'Bearer ' + request.headers['spotify-access-token']
    }
}
