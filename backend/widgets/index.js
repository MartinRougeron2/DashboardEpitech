module.exports = function (updateDict) {
    require('./spotify')(updateDict);
    require('./spoonacular')(updateDict);
    require('./unsplash')(updateDict);
}
