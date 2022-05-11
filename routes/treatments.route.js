
const router = require("express").Router();
const { getAllTreatments } = require("../Controller/treatments.controller");
/* Get treatments */
router.get("/", getAllTreatments)


module.exports = router;