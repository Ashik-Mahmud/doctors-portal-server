
const router = require("express").Router();
const { createBookingTreatment } = require("../Controller/booking.controller");
/* post create booking */
router.post("/", createBookingTreatment)

module.exports = router;