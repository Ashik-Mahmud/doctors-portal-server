/* get all the treatments */
const client = require("../Connection/connection");
const data = require("./../models/data.json")

const getAllTreatments = async(req, res) => {
    await client.connect();
    const treatmentCollection = client.db('doctors-portal').collection("treatments");
    const query = {};
    const cursor = treatmentCollection.find(query);
    const result = await cursor.toArray();
    res.send({success: true, result})
}



module.exports = {getAllTreatments}