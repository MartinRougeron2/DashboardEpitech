const { Widget } = require('../../../db/widget');
const saveInDB = require('./../../../services/utils')

const widgetRecipesByIngredients = new Widget({
    name: 'eat-something',
    verboseName: 'What\'s in your fridge',
    description: 'Find recipes that use as many of the given ingredients as possible and require as few additional ingredients as possible.',
    params: [{
        param: {value: '', name: 'includeIngredients', required: true, possible_values: []},
        }],
    isSub: false,
    baseRoute: 'https://api.spoonacular.com/recipes/',
    needLogin: false,
    primaryColor: '#008e40',
    secondaryColor: '#ffffff',
    customRoutes: [],
    customResources: [],
    coverImage: 'https://9to5google.com/wp-content/uploads/sites/4/2021/06/photo_2021-06-25_13-18-48.jpg',
});

saveInDB(Widget, 'eat-something', widgetRecipesByIngredients);

module.exports = widgetRecipesByIngredients;
