const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoute = require('./routes/UserRoute');
const adminRoute = require('./routes/AdminRoute');
const riderRouter = require('./routes/RiderRoute');

const app = express();

app.use(cors());

app.use(express.json());



require('dotenv').config();
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require("dotenv").config({
        path: "./.env"
    })
}

const port = process.env.PORT;
const dbconnection = process.env.dburl;


app.listen(port, (req, res) => {
    console.log(`App listening on ${port}`)
})

app.get('/', (req, res) => {
    res.send('Hello Laundry Finder')
})

//connect to the database
//create a database connection
mongoose.connect(dbconnection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database Connection Successful')
    })
    .catch((err) => {
        console.log(err)
        console.log('error connecting to the database')
    })


app.get('/', (req, res) => {
    res.send('crime reporting server Server started')
})


// make routes
app.use('/api/v2/user',userRoute);

//admin routes
app.use('/api/v2/admin',adminRoute);


//admin routes
app.use('/api/v2/rider',riderRouter);

