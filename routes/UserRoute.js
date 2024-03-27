const mongoose = require('mongoose');
const express = require('express');
const { createUser, Login, getAllUsersByEmail,reportCrime,getAllLaundries,getAllOrdersByEmailAndStatus, updateUserSubscriptionByEmail, getAllUsers, getAllUsersPhoneNumbers, getAllUsersWithActiveSubscription, makeOrder, getAllOrdersByEmail } = require('../controller/UserController');


const router = express.Router();
router.use(express.json());


//allow url encoded
router.use(express.urlencoded({extended:false}));


//get all users
// router.get('/users',)

//register a new user
router.post('/register',createUser);

//login route
router.post('/login',Login);

//get user by email
router.get('/users/:email',getAllUsersByEmail);

//update user subscription
router.put('/subscription/:email',updateUserSubscriptionByEmail);


//get all the users
router.get('/allusers',getAllUsers)


// //get all laundries
// router.get('/alllaundries',getAllLaundries);

//make an order
router.post('/report',reportCrime);

//get all orders by email
router.get('/orders/:customeremail',getAllOrdersByEmail);


//get all orders by email and order status is not equeal to completed
router.get('/incompleteorders/:email',getAllOrdersByEmailAndStatus);








module.exports = router;