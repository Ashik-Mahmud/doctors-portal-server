const { ObjectId } = require("mongodb");
const client = require("../Connection/connection");
const SendEmail = require("../SendEmail/SendEmail");
const bookingCollection = client.db('doctors-portal').collection("bookings");
const paymentCollection = client.db("doctors-portal").collection("payments");

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
        res.send({success: true, message: "Booking successfully done & check your email."})
        SendEmail(data)
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


const patchBooking = async(req, res) =>{
    await client.connect();
    const data = req.body;
    const bookingId = data.appointmentId;
    const updateDoc = {
        $set: {
            status: data?.status,
            transactionId: data?.transactionId
        }
    }
    const result = await bookingCollection.updateOne({_id: ObjectId(bookingId)}, updateDoc);
    const insertedData = await paymentCollection.insertOne(data);
    if(result.acknowledged || insertedData.acknowledged){
        res.send({success: true, message: "Data Saved successfully done."})
    }

}


module.exports = {createBookingTreatment, getCurrentUserBooking, deleteCurrentUserBooking, patchBooking}