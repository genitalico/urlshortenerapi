const config = {};

var mongoConnection = '';
var mongodbName = '';
var collectionName1 = 'store1';
var url = '';

if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == "staging") {
    mongoConnection = process.env.mongoConnection;
    mongodbName = process.env.mongodbName;
    url = process.env.url;
}
else {
    mongoConnection = 'mongodb://sa:123456789@localhost:27017';
    mongodbName = 'yellowme';
    url = 'http://localhost:3000/';
}

config.mongoConnection = mongoConnection;
config.mongodbName = mongodbName;
config.collectionName1 = collectionName1;
config.url = url;

module.exports = config;