const mongoose = require('mongoose');
require('./dbConfig.js');
const otpSchema = mongoose.Schema({
    email:String,
    otpVal:String
})
module.exports = mongoose.model('otps', otpSchema)