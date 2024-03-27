const mongoose = require('mongoose');
const express = require('express');
const { createRider, Login,getAllOrdersByEmail,getAllRidersByEmail } = require('../controller/RiderController');



const router = express.Router();
router.use(express.json());


//allow url encoded
router.use(express.urlencoded({extended:false}));


//get all users
// router.get('/users',)

//register a new user
router.post('/register',createRider);

//login route
router.post('/login',Login);

// get order by email
router.get('/riderorders/:rider',getAllOrdersByEmail);

//update user subscription
// router.put('/subscription/:email',updateUserSubscriptionByEmail);


//get all the user information
router.get('/riderinfo/:email',getAllRidersByEmail)






module.exports = router;