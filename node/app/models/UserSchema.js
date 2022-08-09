var mongoose = require('mongoose');
var schema = mongoose.Schema;

var user = new schema({
    accessToken : { type: String },
    email : { type: String }
},{
    timestamps:true
});

var User = mongoose.model('user', user);

module.exports = {
    User
}