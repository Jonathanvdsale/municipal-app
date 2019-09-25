//Schema for the markers placed on the map

var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var markerSchema = new mongoose.Schema({
    name: text,
    lat: Number,
    lng: Number,
    type: text
})
 
 
module.exports = mongoose.model('Marker', markerSchema);
