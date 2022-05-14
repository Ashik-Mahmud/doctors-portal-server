const client = require("../Connection/connection");
const bookingCollection = client.db('doctors-portal').collection("bookings");
const treatmentCollection = client.db('doctors-portal').collection("treatments");

const getAvailableDate = async(req, res) => {
    await client.connect();
    const data = req.query.date || "May 15, 2022"; 
    
    const treatments = await treatmentCollection.find().toArray();

    const query = {date: data}
    const currentDateBooking = await bookingCollection.find(query).toArray();

    treatments.forEach(treatment => {
        const bookedTreatments = currentDateBooking.filter(booked => booked.treatment === treatment.name);
        const allTheSlots = bookedTreatments.map(booking => booking.time);
        const available =  treatment.slots.filter(slot => !allTheSlots.includes(slot));
        treatment.slots = available;
    })


    res.send(treatments)
    
        
}

module.exports = {getAvailableDate}