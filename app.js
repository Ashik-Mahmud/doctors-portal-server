/* init server  */
const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
const treatmentsRouter = require("./routes/treatments.route.js")

// middleware 
app.use(cors());
app.use(express.json())

/* get treatments */
app.use('/treatments', treatmentsRouter)



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