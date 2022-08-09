var mongoose = require('mongoose');
var schema = mongoose.Schema;


var application = new schema({
    name : { type:String, required: true},
    email : { type:String, required: true },
    address : { type:String, default:null },
    gender: { type:String, default:null },
    contact: { type:String, default:null }
},{
    timestamps:true
});

var Application = mongoose.model('application', application);

module.exports = {
    Application
}