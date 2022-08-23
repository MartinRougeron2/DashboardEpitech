const { WidgetParams } = require('../db/widgetParams');

//! Send error to front
function saveParams(id, params) {
    console.log('saving params', id)
    const jsonParams = JSON.parse(params);

    let objString = "[";

    for (const prop in jsonParams) {
        objString += JSON.stringify({name: prop, value: jsonParams[prop]}) + ",";
    }
    objString += "]";

    objString = objString.replace(",]", "]");

    WidgetParams.findById(id, function (err, p) {
        if (err)
            return console.error("update widget params: ", err);
        // p.params.push(JSON.parse(obj));
        console.log(objString);
        const obj = JSON.parse(objString);
        p.params = [];
        for (const prop in obj) {
            p.params.push(obj[prop]);
        }
        p.save();
    });
}

module.exports = saveParams
