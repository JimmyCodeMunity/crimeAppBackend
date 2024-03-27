const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    laundryname:{
        type:String
    },
    customername: {
        type: String,
        // required: [true, "enter username"]
    },
    customeremail: {
        type: String,
        // required: [true, "enter username"]
    },
    customerphone: {
        type: String,
        // required: [true, "enter username"]
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
    orderstatus: {
        type: String,
        default:'waiting'
    },
    rider: {
        type: String,
        default:'null'
    },
    riderphone: {
        type: String,
        default:'null'
    },
    vehicle: {
        type: String,
        default:'null'
    },
    price: {
        type: String,
        default:'null'
    },
    weight: {
        type: String,
        default:'null'
    },
    description:{
        type:String,
        default:'none'
    },
    
    
    
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    

});

const Order = mongoose.model('Orders',orderSchema);

module.exports = Order;