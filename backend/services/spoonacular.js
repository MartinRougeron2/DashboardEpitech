const saveInDB = require('./utils')
const db = require('../db');
const Service = db.service;

const widgetRecipesByIngredients = require('../widgets/spoonacular/models/widget_recipes_by_ingredients');
const widgetDishPairing = require('../widgets/spoonacular/models/widget_dish_paring');

const spoonacularService = new Service({
    name: 'Spoonacular',
    description: 'Spoonacular is an API of food.',
    token: null,
    refreshToken: null,
    expiresOn: 9999999999999,
    widgets: [],
    logoPath: 'https://spoonacular.com/images/spoonacular-logo-b.svg',
    textColor: 'green'
});

spoonacularService.widgets.push(widgetRecipesByIngredients);
spoonacularService.widgets.push(widgetDishPairing);

saveInDB(Service, 'Spoonacular', spoonacularService);

module.exports = spoonacularService;
