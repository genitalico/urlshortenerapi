const joi = require('joi');

module.exports.SortenerPostModel = joi.object().keys({
    url: joi.string().required()
});

module.exports.ShortenerModel = function () {
    this.url = '';
    this.url_short = '';
    this.create_date = new Date()
}

module.exports.UrlShortenerBulkModel = joi.object().keys({
    url_bulk: joi.array().items(joi.string().required()).required()
});