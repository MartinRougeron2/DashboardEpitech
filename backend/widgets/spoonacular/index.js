module.exports = function (updateDict) {
    require('./recipes_by_ingredients')(updateDict);
    require('./dish_paring')(updateDict);
}
