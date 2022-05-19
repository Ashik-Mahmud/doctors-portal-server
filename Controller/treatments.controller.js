/* get all the treatments */
const client = require("../Connection/connection");
const treatmentCollection = client.db('doctors-portal').collection("treatments");
const getAllTreatments = async(req, res) => {
    await client.connect();
    const query = {};
    const cursor = await treatmentCollection.find(query);
    const result = await cursor.toArray();
    res.send({success: true, result})
}

const getTreatmentsServices = async(req, res) => {
    await client.connect();
    const result =  await treatmentCollection.find({}).project({name: 1}).toArray();
    res.send(result)    
}



module.exports = {getAllTreatments, getTreatmentsServices}