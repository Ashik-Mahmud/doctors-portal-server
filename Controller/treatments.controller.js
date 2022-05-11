/* get all the treatments */
const data = require("./../models/data.json")

const getAllTreatments = (req, res) => res.send({data})


module.exports = {getAllTreatments}