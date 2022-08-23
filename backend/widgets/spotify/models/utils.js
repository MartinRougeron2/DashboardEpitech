const db = require('../../../db');
const Widget = db.widget;

async function toSave(name) {
    return await Widget.findOne({
        name: name
    }).exec((err, widget) => {
        if (err)
            throw err;
        return !widget;

    })
}

module.exports = {toSave}
