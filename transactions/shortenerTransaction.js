var models = require('../models/shortenerBinding');

module.exports.PostUrlShortener = function (db, model, callback) {

    var resultCallback = {
        transactionDone: false,
        internalError: false
    }

    try {
        resultCallback.transactionDone = true;
        resultCallback.internalError = false;
        callback(resultCallback);
        return;
    }
    catch (err) {
        resultCallback.transactionDone = false;
        resultCallback.internalError = true;
        callback(resultCallback);
        return;
    }
}
