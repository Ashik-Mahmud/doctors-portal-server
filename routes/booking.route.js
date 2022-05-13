
const router = require("express").Router();
const { createBookingTreatment, getCurrentUserBooking, deleteCurrentUserBooking } = require("../Controller/booking.controller");
const VerifyToken = require("../VerifyToken/VerifyToken");
/* post create booking */
router.post("/", createBookingTreatment)
router.get("/", VerifyToken, getCurrentUserBooking)
router.delete("/", VerifyToken, deleteCurrentUserBooking)

module.exports = router;