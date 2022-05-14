const { ObjectId } = require("mongodb");
const client = require("../Connection/connection");
const bookingCollection = client.db('doctors-portal').collection("bookings");
const createBookingTreatment = async(req, res) => {
    await client.connect();
    const data = req.body; 
    const query = {date: data.date, treatment: data.treatment, email: data.email};
    const isAlreadyBooked = await bookingCollection.findOne(query)
    if(isAlreadyBooked){
        return res.send({success: false, message: "You already booked bro", result: isAlreadyBooked})
    }
    const result = await bookingCollection.insertOne(data)
    if(result.acknowledged){
        res.send({success: true, message: "Booking successfully done."})
    }
}


const getCurrentUserBooking = async(req, res) => {
    await client.connect();
    const decodedId = req.decoded.uid;
    const userId = req.query.uid;
    if(decodedId === userId){
        const query = {"author.uid": userId}
        const cursor = bookingCollection.find(query);
        const result = await cursor.toArray();
        res.send({success: true, result});
    }else{
        res.status(403).send({success: false, message: "Forbidden Request."})
    }    
    
}

const deleteCurrentUserBooking = async(req, res) => {
    await client.connect();
    const decodedId = req.decoded.uid;
    const userId = req.query.uid;
    const deletedId = req.query.id;
    
    if(decodedId === userId){
        const query = {"_id": ObjectId(deletedId)}
        const result = await bookingCollection.deleteOne(query)
        if(result.acknowledged){
            res.send({success: true, message: "deleted successfully done."});
        }
    }else{
        res.status(403).send({success: false, message: "Forbidden Request."})
    }    
    
}

module.exports = {createBookingTreatment, getCurrentUserBooking, deleteCurrentUserBooking}