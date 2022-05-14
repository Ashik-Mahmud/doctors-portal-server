const { getAvailableDate } = require("../Controller/available.controller");

const router = require("express").Router();


/* post create booking */
router.get("/", getAvailableDate)


module.exports = router;