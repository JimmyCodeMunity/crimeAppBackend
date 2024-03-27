const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, "enter username"]
    },
    email: {
        type: String,
        // required: [true, "enter email"]
    },
    password: {
        type: String,
        minLength: 6,
        select: true,
    },
    phone: {
        type: String,
    },
    address: {
        type:String,
    },
    vehicle:{
        type:String,
    },
    regnumber:{
        type:String,
    },
    status:{
        type:String,
        default:'idle'
    },
    
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    
    resetPasswordToken: String,
    resetPasswordTime: Date,

});

const Rider = mongoose.model('rider',riderSchema);

module.exports = Rider;