var express = require('express');
var router = express.Router();
var messageResponse = require("webservice-tools");
const joi = require('joi');
const models = require('../models/shortenerBinding');
var transactions = require('../transactions/shortenerTransaction');

router.post('/url', function (req, res, next) {
    var model = req.body;
    var db = req.db;
    res.contentType("application/json");

    joi.validate(model, models.SortenerPostModel, function (err, validModel) {
        if (err) {
            var Ok = {};
            Ok = messageResponse.OkReponse(messageResponse.InvalidModel());
            err.details.forEach(function (v, i) {
                Ok.body.messages.push(v.message.split("\"").join(""));
            });
            res.status(Ok.statusCode);
            res.json(Ok.body);
            return;
        }
        else {
            transactions.PostUrlShortener(db, validModel, function (result) {
                if (result.internalError) {
                    var Ok = {};
                    Ok = messageResponse.OkReponse(messageResponse.InternalError());
                    res.status(Ok.statusCode);
                    res.json(Ok.body);
                    return;
                }

                if (!result.transactionDone) {
                    var Ok = {};
                    Ok = messageResponse.OkReponse(messageResponse.RegisterNotFound());
                    res.status(Ok.statusCode);
                    res.json(Ok.body);
                    return;
                }

                if (result.transactionDone) {
                    var Ok = {};
                    Ok = messageResponse.OkReponse(messageResponse.Correct());
                    Ok.body.content = {
                        url_shorter: result.url_short
                    };
                    res.status(200);
                    res.json(Ok.body);
                    return;
                }
            })
        }
    });
});

router.post('/urlbulk', function (req, res, next) {
    var model = req.body;
    var db = req.db;
    res.contentType("application/json");

    joi.validate(model, models.UrlShortenerBulkModel, function (err, validModel) {
        if (err) {
            var Ok = {};
            Ok = messageResponse.OkReponse(messageResponse.InvalidModel());
            err.details.forEach(function (v, i) {
                Ok.body.messages.push(v.message.split("\"").join(""));
            });
            res.status(Ok.statusCode);
            res.json(Ok.body);
            return;
        }
        else {
            transactions.PostUrlShortenerBulk(db, validModel, function (result) {
                if (result.internalError) {
                    var Ok = {};
                    Ok = messageResponse.OkReponse(messageResponse.InternalError());
                    res.status(Ok.statusCode);
                    res.json(Ok.body);
                    return;
                }

                if (!result.transactionDone) {
                    var Ok = {};
                    Ok = messageResponse.OkReponse(messageResponse.RegisterNotFound());
                    res.status(Ok.statusCode);
                    res.json(Ok.body);
                    return;
                }

                if (result.transactionDone) {
                    var Ok = {};
                    Ok = messageResponse.OkReponse(messageResponse.Correct());
                    Ok.body.content = {
                        url_bulk: result.url_bulk
                    };
                    res.status(200);
                    res.json(Ok.body);
                    return;
                }
            })
        }
    });

});

router.get('/urlall', function (req, res, next) {
    var db = req.db;
    res.contentType("application/json");

    transactions.GetAllUrl(db, function (result) {
        if (result.internalError) {
            var Ok = {};
            Ok = messageResponse.OkReponse(messageResponse.InternalError());
            res.status(Ok.statusCode);
            res.json(Ok.body);
            return;
        }

        if (!result.transactionDone) {
            var Ok = {};
            Ok = messageResponse.OkReponse(messageResponse.RegisterNotFound());
            res.status(Ok.statusCode);
            res.json(Ok.body);
            return;
        }

        if (result.transactionDone) {
            var Ok = {};
            Ok = messageResponse.OkReponse(messageResponse.Correct());
            Ok.body.content = {
                urls: result.documents
            };
            res.status(200);
            res.json(Ok.body);
            return;
        }
    });
});

module.exports = router;