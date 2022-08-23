
function saveInDB(collection, name, toSave) {
    collection.findOne({ name: name }, function (err, collection) {
        if (err) {
            return console.log(err);
        }
        if (!collection)
            toSave.save()
    })
}

module.exports = saveInDB;
