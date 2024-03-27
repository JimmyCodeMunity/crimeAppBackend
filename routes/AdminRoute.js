const mongoose = require('mongoose');
const express = require('express');
const { createAdmin, Login, getAllUsersByEmail, getAllUsers,getAllCrimes,getAllCrimesById,updateCrimeById, createRider, getAllRiders, createLaundry, getAllLaundries } = require('../controller/AdminController');


const router = express.Router();
router.use(express.json());


//allow url encoded
router.use(express.urlencoded({extended:false}));


//get all users
// router.get('/users',)

//register a new user
router.post('/register',createAdmin);


//add new rider
router.post('/addrider',createRider);

//login route
router.post('/login',Login);

//get user by email
router.get('/admindata/:email',getAllUsersByEmail);

//get order by id
router.get('/crimes/:id',getAllCrimesById)

//update user subscription
// router.put('/subscription/:email',updateUserSubscriptionByEmail);


//get all the users
router.get('/allusers',getAllUsers)

//get all the users
router.get('/allcrimes',getAllCrimes)


//get all orders
// router.get('/allorders',getAllOrders)

//GET ALL LAUNDRIES
router.get('/alllaundries',getAllLaundries)


//create Laundry
router.post('/createlaundry',createLaundry);


//update order by id

router.put('/updatecrime/:id',updateCrimeById)





module.exports = router;