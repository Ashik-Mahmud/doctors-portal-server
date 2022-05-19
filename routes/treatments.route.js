
const router = require("express").Router();
const { getAllTreatments , getTreatmentsServices} = require("../Controller/treatments.controller");
/* Get treatments */
router.get("/", getAllTreatments)
router.get("/services", getTreatmentsServices)


module.exports = router;