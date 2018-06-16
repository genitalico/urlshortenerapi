const config = require('../appsettings');

var InsertOneDocument = function (db, model, callback) {
    let result = {
        content: {},
        result: false
    };
    try {

        db.collection(config.collectionName1).insertOne(model, function (err, r) {
            if (err) {
                result.result = false;
                callback(result);
                return;
            }
            else {
                result.result = true;
                callback(result);
                return;
            }
        });
    }
    catch (err) {
        result.content = null;
        result.result = false;
        callback(result);
        return;
    }
}

var FindDocumentUlrShort = function (db, urlShort, callback) {
    let result = {
        content: {},
        result: false
    };

    try {
        let query = { url_short: urlShort };

        let cursor = db.collection(config.collectionName1).find(query);

        cursor.toArray(function (err, documents) {
            if (err) {
                result.result = false;
                callback(result);
                return;
            }
            if (documents.length > 0) {
                let document = documents[0];
                result.content = document;
                result.result = true;
                callback(result);
                return;
            }
            else {
                result.result = false;
                callback(result);
                return;
            }
        });
    }
    catch (err) {
        result.content = null;
        result.result = false;
        callback(result);
        return;
    }
}

var InsertManyDocument = function (db, model, callback) {
    let result = {
        content: {},
        result: false
    };
    try {

        db.collection(config.collectionName1).insertMany(model, function (err, r) {
            if (err) {
                result.result = false;
                callback(result);
                return;
            }
            else {
                result.result = true;
                callback(result);
                return;
            }
        });
    }
    catch (err) {
        result.content = null;
        result.result = false;
        callback(result);
        return;
    }
}

module.exports = { InsertOneDocument, FindDocumentUlrShort, InsertManyDocument }