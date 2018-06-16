const config = {};

var mongoConnection = '';
var mongodbName = '';
var collectionName1 = 'store1';

if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == "staging") {
    mongoConnection = process.env.mongoConnection;
    mongodbName = process.env.mongodbName;
}
else {
    mongoConnection = 'mongodb://sa:123456789@localhost:27017';
    mongodbName = 'yellowme';
}

config.mongoConnection = mongoConnection;
config.mongodbName = mongodbName;
config.collectionName1 = collectionName1;

module.exports = config;