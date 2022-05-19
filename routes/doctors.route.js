const { createDoctors, getAllTheDoctors, deleteDoctorsFromDB } = require("../Controller/doctors.controller");
const VerifyAdmin = require("../VerifyAdmin/VerifyAdmin");

const router = require("express").Router();
const VerifyToken = require("../VerifyToken/VerifyToken");
router.post("/", VerifyToken, VerifyAdmin, createDoctors);
router.get("/", VerifyToken, VerifyAdmin, getAllTheDoctors);
router.delete("/", VerifyToken, VerifyAdmin, deleteDoctorsFromDB);

module.exports = router;