const client = require("../Connection/connection");
const createBookingTreatment = async(req, res) => {
    const data = req.body;    
    await client.connect();
    const bookingCollection = client.db('doctors-portal').collection("bookings");
    const result = await bookingCollection.insertOne(data)
    if(result.acknowledged){
        res.send({success: true, message: "Booking successfully done."})
    }
}

module.exports = {createBookingTreatment}