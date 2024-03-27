const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../model/Admin');
const Rider = require('../model/Rider');
const Laundry = require('../model/Laundry');
const Crime = require('../model/Crime');

//create a new user
const createAdmin = async (req, res) => {
    try {
        const { name, email, password, phone,location } = req.body;

        const existingUser = await Admin.findOne({ email });

        //check if user already existing
        if (existingUser) {
            res.status(400).json({ message: 'user already exists' });
        } else {
            const hashedPass = await bcrypt.hash(password, 10);
            const admin = await Admin.create({
                name,
                email,
                password: hashedPass,
                phone,
                location
            })

            res.status(200).json(admin);
            console.log("User Account created Successfully");
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error creating new user' });

    }
}



//add new rider
const createRider = async (req, res) => {
    try {
        const { name, email, password, phone,address,vehicle,regnumber } = req.body;

        const existingUser = await Rider.findOne({ email });

        //check if user already existing
        if (existingUser) {
            res.status(400).json({ message: 'user already exists' });
        } else {
            const hashedPass = await bcrypt.hash(password, 10);
            const rider = await Rider.create({
                name,
                email,
                password: hashedPass,
                phone,
                address,
                vehicle,
                regnumber
            })

            res.status(200).json(rider);
            console.log("User Account created Successfully");
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error creating new user' });

    }
}

//get all the users
const getAllUsers = async (req, res) => {
    try {
        const user = await Admin.find({});
        res.status(200).json(user);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "data not located" })

    }
}
//get all the riders
const getAllRiders = async (req, res) => {
    try {
        const riders = await Rider.find({});
        res.status(200).json(riders);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "data not located" })

    }
}



//get all the laundries
const getAllLaundries = async (req, res) => {
    try {
        const laundries = await Laundry.find({});
        res.status(200).json(laundries);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "data not located" })

    }
}


//get all the laundries
const getAllCrimes = async (req, res) => {
    try {
        const crimes = await Crime.find({});
        res.status(200).json(crimes);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "data not located" })

    }
}

//get all user phone numbers
const getAllUsersPhoneNumbers = async (req, res) => {
    try {
        const users = await Admin.find({}, { phone: 1, _id: 0 }); // Projection to include only phoneNumber field
        const phoneNumbers = users.map(user => user.phone); // Extract phone numbers
        res.status(200).json(phoneNumbers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Data not located" });
    }
}



// //get subscribed users
// const getAllUsersWithActiveSubscription = async (req, res) => {
//     try {
//         const users = await User.find({ subscription: 'Active' }, { phone: 1, location: 1, _id: 0 }); // Projection to include phoneNumber and location fields
//         const userData = users.map(user => ({
//             phone: user.phone,
//             location: user.location
//         }));
//         res.status(200).json(userData);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Data not located" });
//     }
// }





//login users
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // If authentication is successful, you can generate a token and send it to the client
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log("user logged in successfully");

        // If authentication is successful, you can generate a token and send it to the client
        const token = jwt.sign(
            { id: user._id,email:user.email },
             process.env.JWT_SECRET);
        // localStorage.setItem('token',token);
        console.log("authtoken",token);

        return res.status(200).json({ user,token }); // Send the user object as a response
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Login failed' });
    }
}


//get user by email
const getAllUsersByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const user = await Admin.findOne({email});
        if(!user){
            return res.status(404).json({message:'user with that email does not exist'});
        }

        return res.status(200).json(user);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "data not located" })

    }
}


const updateUserSubscriptionByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const { subscription } = req.body;
  
      // Check if newPassword is provided
      if (!updateUserSubscriptionByEmail) {
        return res.status(400).json({ message: 'New password is required' });
      }
  
      // Hash the new password
    //   const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update the user's password
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { subscription: subscription },
        { new: true }
      );
  
      // If user with the provided email is not found
      if (!updatedUser) {
        return res.status(404).json({ message: `Cannot find user with email ${email}` });
      }
  
      res.status(200).json(updatedUser);
      console.log('State updated');
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  //add a new laundry
  //create a new user
const createLaundry = async (req, res) => {
    try {
        const { laundryname, longitude, latitude, phone,price } = req.body;

        const existingLaundry = await Laundry.findOne({ laundryname });

        //check if user already existing
        if (existingLaundry) {
            res.status(400).json({ message: 'laundry already exists' });
        } else {
            // const hashedPass = await bcrypt.hash(password, 10);
            const laundry = await Laundry.create({
                laundryname,
                longitude,
                latitude,
                phone,
                price
            })

            res.status(200).json(laundry);
            console.log("Laundry created Successfully");
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error creating new laundry' });

    }
}
const getAllCrimesById = async (req, res) => {
    try {
        const { id } = req.params;
        const crimes = await Crime.findById(id);
        if (!crimes) {
            return res.status(404).json({ message: 'crime with that email does not exist' });
        }
        // console.log(order);

        return res.status(200).json(crimes);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "data not located" })

    }
}


const updateCrimeById = async(req,res) =>{
    try {
    const { id } = req.params;
    const crime = await Crime.findByIdAndUpdate(id,req.body,{ new: true });

    // If brand fetched cannot be found
    if (!crime) {
      return res.status(404).json({ message: `Cannot find crime with id ${id}` });
    }

    res.status(200).json(crime);
    console.log("Data updated successfully");

  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}


module.exports = {
    createAdmin,
    createRider,
    Login,
    getAllUsersByEmail,
    getAllUsers,
    updateUserSubscriptionByEmail,
    getAllUsersPhoneNumbers,
    getAllCrimes,
    createLaundry,
    getAllLaundries,
    getAllCrimesById,
    updateCrimeById

}