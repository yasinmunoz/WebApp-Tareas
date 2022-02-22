// Config Mongoose
var mongoose = require('mongoose');

var uri = 'mongodb://localhost/tareasapp';

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('connecting', function () { console.log('Connecting to ', uri); });
db.on('connected', function () { console.log('Connected to ', uri); });
db.on('disconnecting', function () { console.log('Disconnecting from ', uri); });
db.on('disconnected', function () { console.log('Disconnected from ', uri); });
db.on('error', function (err) { console.error('Error ', err.message); });

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    // .then(function () { mongoose.disconnect(); })
    .catch(function (err) { console.error('Error', err.message); });
