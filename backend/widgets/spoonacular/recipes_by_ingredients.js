const widgetRecipesByIngregients = require('./models/widget_recipes_by_ingredients');
const requestModule = require('request');

module.exports = function (updateDict) {
    updateDict[widgetRecipesByIngregients.name] = function widget(request, response) {
        const ingredients = JSON.parse(request.query.options).includeIngredients;
        const urlSearchRecipes = `${widgetRecipesByIngregients.baseRoute}complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&sort=random&number=1&includeIngredients=${ingredients}`;

        const options = {
            url: urlSearchRecipes,
            json: true
        }

        if (!ingredients) {
            response.status(200).send({
                data: `<p class="text-white" style="width: 250px">Put some ingredients to get a recipes :)</p>`
            })
            return;
        }

        requestModule.get(options, (error, res, body) => {
            if (error)
            response.status(500).send({message: error});

            if (res.statusCode !== 200) {
                return response.status(200).send({
                    data: `<p class="text-white" style="width: 250px">We cannot find a recipes. :'(</p>`
                })
            }
            if (!body.results[0])
            return response.status(200).send({
                data: `<p class="text-white" style="width: 250px">We cannot find a recipe with those ingredients :'(</p>`
            })
            const id = body.results[0].id;

            const urlGetRecipeCard = `${widgetRecipesByIngregients.baseRoute}${id}/card?apiKey=${process.env.SPOONACULAR_API_KEY}`;
            options.url = urlGetRecipeCard;
            requestModule.get(options, (error, res, body) => {
                if (res.statusCode !== 200) {
                    return response.status(200).send({
                        data: `<p class="text-white" style="width: 250px">We cannot find a recipes. :'(</p>`
                    })
                }
                response.status(200).send({
                    data: `<a target="_blank" href="${body.url}"><img width="250" alt="Recipe" src=${body.url}></a>`
                })
            })
        })
    }
}
