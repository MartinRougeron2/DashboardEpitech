const { Widget } = require('../../../db/widget');
const saveInDB = require("../../../services/utils");

const widgetRandomPhotos = new Widget({
    name: 'random-image',
    verboseName: 'Make me travel !',
    description: 'Show my a random photo',
    params: [{
        param: {value: '', name: 'orientation', required: true},
        possible_values: [
            {name: 'Short Time Range', value: 'landscape'},
            {name: 'Medium Time Range', value: 'portrait'},
            {name: 'Long Time Range', value: 'squarish'}
        ]}],
    isSub: true,
    baseRoute: 'https://api.unsplash.com/photos/random',
    needLogin: true,
    primaryColor: '#6b6b6b',
    secondaryColor: '#ffffff',
    customRoutes: [],
    customResources: [],
    coverImage: 'https://images.unsplash.com/photo-1638393630000-e0c2201e1465?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'
});

saveInDB(Widget, widgetRandomPhotos.name, widgetRandomPhotos);

module.exports = widgetRandomPhotos;
