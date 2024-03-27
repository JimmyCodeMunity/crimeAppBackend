const mongoose = require('mongoose');

const crimeSchema = new mongoose.Schema({
    crime:{
        type:String
    },
    name: {
        type: String,
        // required: [true, "enter username"]
    },
    location: {
        type: String,
        // required: [true, "enter username"]
    },
    description:{
        type:String,
        default:'none'
    },
    longitude: {
        type: Number,
        default:'none'
        // required: [true, "enter email"]
    },
    latitude: {
        type: Number,
        default:'none'
    },
    status: {
        type: String,
        default:'none'
    },
    
    
    
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    

});

const Crime = mongoose.model('Crimes',crimeSchema);

module.exports = Crime;