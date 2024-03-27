const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Rider = require('../model/Rider');
const Order = require('../model/Order');

//create a new user
const createRider = async (req, res) => {
    try {
        const { name, email, password, phone,location } = req.body;

        const existingUser = await User.findOne({ email });

        //check if user already existing
        if (existingUser) {
            res.status(400).json({ message: 'user already exists' });
        } else {
            const hashedPass = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPass,
                phone,
                location
            })

            res.status(200).json(user);
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
        const user = await Rider.find({});
        res.status(200).json(user);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "data not located" })

    }
}


//get order by email
const getAllOrdersByEmail = async (req, res) => {
    try {
        const { rider } = req.params;
        const order = await Order.find({ rider });
        if (!order) {
            return res.status(404).json({ message: 'order with that email does not exist' });
        }

        return res.status(200).json(order);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "data not located" })

    }
}
//get all user phone numbers
const getAllUsersPhoneNumbers = async (req, res) => {
    try {
        const users = await Rider.find({}, { phone: 1, _id: 0 }); // Projection to include only phoneNumber field
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

        const user = await Rider.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // If authentication is successful, you can generate a token and send it to the client
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.status(200).json({ user }); // Send the user object as a response
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Login failed' });
    }
}


//get user by email
const getAllRidersByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const user = await Rider.findOne({email});
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

  //get all orders by id

  const getAllOrdersById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'order with that email does not exist' });
        }
        // console.log(order);

        return res.status(200).json(order);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "data not located" })

    }
}


module.exports = {
    createRider,
    Login,
    getAllRidersByEmail,
    getAllUsers,
    updateUserSubscriptionByEmail,
    getAllUsersPhoneNumbers,
    getAllOrdersByEmail

}