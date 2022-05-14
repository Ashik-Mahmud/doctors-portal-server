/* init server  */
const express = require('express');
const cors = require('cors');
require("dotenv").config();


const app = express();
const treatmentsRouter = require("./routes/treatments.route.js")
const bookingRouter = require("./routes/booking.route.js")
const loginRouter = require("./routes/login.route.js")
const availableRouter = require("./routes/available.route.js")
// middleware 
app.use(cors());
app.use(express.json())

/* get treatments */
app.use('/treatments', treatmentsRouter)

/* create booking */
app.use('/booking', bookingRouter)

/* login  */
app.use("/login", loginRouter)


/* login  */
app.use("/available", availableRouter)

 /* testing api  */
app.get('/', (req, res) =>{
    res.send({success: true, message: "yeah successfully done to create first api"})
})

/* not found routes */
app.use((req, res, next) =>{
    res.status(404).send({success: false, message: "Not Found Route"})
})
/* Server Error Routes */
app.use((err, req,res, next) =>{
    res.status(500).send({success: false, message: "Something Broke of your API"})
})


module.exports = app;