const mongoose = require('mongoose')
require('./dbConfig.js');
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})
module.exports = mongoose.model('users', userSchema)
