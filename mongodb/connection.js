var mongodb = require("mongodb");
const config = require("../appsettings");
var client = mongodb.MongoClient;

exports.cn = function (app, opts) {
    opts = opts || {};
    var property = opts.property || "db";

    var connection;

    return function MongoDb(req, res, next) {
        if (!connection) {
            connection = client.connect(config.mongoConnection, opts);
        }
        connection
            .then(function (client) {
                let db = client.db(config.mongodbName);
                req[property] = db;
                app.set("mongodb", db);
                next();
            })
            .catch(function (err) {
                connection = undefined;
                next(err);
            });
    };
};
