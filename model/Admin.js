const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    location: {
        type:String,
    default:'none'
    },
    usertype:{
        type:String,
        deafult:'admin'
    },
    
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    
    
    resetPasswordToken: String,
    resetPasswordTime: Date,

});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;