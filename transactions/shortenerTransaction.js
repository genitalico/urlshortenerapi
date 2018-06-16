var models = require('../models/shortenerBinding');
var helperTransaction = require('./helperTransaction');
const config = require('../appsettings');

module.exports.PostUrlShortener = function (db, model, callback) {

    var resultCallback = {
        transactionDone: false,
        internalError: false
    }

    try {

        let urlShort = Random(6);

        let documentModel = new models.ShortenerModel();
        documentModel.url = model.url;
        documentModel.url_short = urlShort;


        helperTransaction.InsertOneDocument(db, documentModel, function (r) {
            if (r.result) {
                resultCallback.transactionDone = true;
                resultCallback.internalError = false;
                let url_short = config.url + urlShort;
                resultCallback.url_short = url_short;
                callback(resultCallback);
                return;
            }
            else {
                resultCallback.transactionDone = true;
                resultCallback.internalError = true;
                callback(resultCallback);
                return;
            }
        });
    }
    catch (err) {
        resultCallback.transactionDone = false;
        resultCallback.internalError = true;
        callback(resultCallback);
        return;
    }
}

var Random = function (size) {

    let text = "";

    let dictionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < size; i++)
        text += dictionary.charAt(Math.floor(Math.random() * dictionary.length));

    return text;
}

var Insert = function () {


}
