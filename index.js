/* init server  */
const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
// port 
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json())

// testing api 
app.get('/', (req, res) =>{
    res.send({message: "yeah successfully done to create first api"})
})



/* Listen port of */
app.listen(port, ()=>{
    console.log(`SERVER RUNNING ON PORT ${port}`);
})
