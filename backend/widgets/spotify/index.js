module.exports = function (updateDict) {
    require('./my_top_songs')(updateDict);
    require('./find_new_music')(updateDict);
    require('./find_music')(updateDict);
}
