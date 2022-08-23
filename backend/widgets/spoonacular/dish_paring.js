const widgetRecipesByIngregients = require('./models/widget_dish_paring');
const requestModule = require('request');

module.exports = function (updateDict) {
    updateDict[widgetRecipesByIngregients.name] = function widget(request, response) {

        const param = JSON.parse(request.query.options);
        // const url = `${widgetRecipesByIngregients.baseRoute}pairing?apiKey=${process.env.SPOONACULAR_API_KEY}&food=${param.food}&maxPrice=${param.maxPrice}`
        const url = `${widgetRecipesByIngregients.baseRoute}pairing?apiKey=${process.env.SPOONACULAR_API_KEY}&food=${param.maxPrice}&maxPrice=50`

        const options = {
            url: url,
            json: true
        }
        if (/* !param.food &&  */!param.maxPrice) {
            return response.status(200).send({
                data: `<p class="text-white" style="width: 250px">Put a dish to get wine pairing :)</p>`
            })
        }
        console.log(param.maxPrice);
        requestModule.get(options, (error, res, body) => {

            if (error) {
                response.status(500).send({message: error});
            }
            if (res.statusCode !== 200 || !body) {
                return response.status(200).send({
                    data: `<p class="text-white" style="width: 250px">We cannot find a pairing. :'(</p>`
                })
            }
            if (!body.productMatches[0]) {
                return response.status(200).send({
                    data: `<p class="text-white" style="width: 250px">We cannot find a pairing. :'(</p>`
                })
            }
            console.log(body.productMatches[0]);
            const dataWine = body.productMatches[0];
            return response.status(200).send({
                data: ` <div class="flex flex-center">
                            <p class="text-white text-h4 flex flex-center" style="width: 250px">${body.pairedWines[0]} ${Math.floor(dataWine.score * 10)}/10</p>
                            <a target="_blank" href="${dataWine.link}"><img width="250" alt="Wine" src=${dataWine.imageUrl}></a>
                        </div>`
            })
        });
    }
}
