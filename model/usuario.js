var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});
module.exports = mongoose.model('Usuario', schema);
