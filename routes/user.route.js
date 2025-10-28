const express=require("express");
const { singup } = require("../Controllers/auth.controller");
const router=express.Router()
router.use("/singup",singup)



module.exports = router 