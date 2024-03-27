const mongoose = require('mongoose');

const laundrySchema = new mongoose.Schema({
    laundryname: {
        type: String,
        // required: [true, "enter username"]
    },
    longitude: {
        type: String,
        // required: [true, "enter email"]
    },
    latitude: {
        type: String,
    },
    price: {
        type: String,
    },
    phone: {
        type:String
    },
    
    
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    

});

const Laundry = mongoose.model('Laundry',laundrySchema);

module.exports = Laundry;