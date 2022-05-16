const { createUserFromClient, getUsers, createUserAdmin, isUserAdmin } = require("../Controller/users.controller");
const VerifyToken = require("../VerifyToken/VerifyToken");
const router = require("express").Router();


/* post create booking */
router.put("/", createUserFromClient)
router.get("/",VerifyToken, getUsers)
router.put("/admin",VerifyToken, createUserAdmin)
router.get("/isAdmin",VerifyToken, isUserAdmin)



module.exports = router;