const { Widget } = require('../../../db/widget');
const saveInDB = require('./../../../services/utils')

const widgetDishPairing = new Widget({
    name: 'dish-pairing',
    verboseName: 'What wine ?',
    description: 'Find the perfect wine for a dish.',
    params: [{
        param: {value: '', name: 'food', required: true, possible_values: []},
        param: {value: '50', name: 'maxPrice', required: true, possible_values: []},
        }],
    isSub: false,
    baseRoute: 'https://api.spoonacular.com/food/wine/',
    needLogin: false,
    primaryColor: '#008e40',
    secondaryColor: '#ffffff',
    customRoutes: [],
    customResources: [],
    coverImage: 'https://9to5google.com/wp-content/uploads/sites/4/2021/06/photo_2021-06-25_13-18-48.jpg',
});

saveInDB(Widget, 'dish-pairing', widgetDishPairing);

module.exports = widgetDishPairing;
