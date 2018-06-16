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
                    res.status(200);
                    res.json(Ok.body);
                    return;
                }
            })
        }
    });
});

module.exports = router;