const express=require("express");
const { singup,login } = require("../Controllers/auth.controller");
const {auth,userauth,adminauth}=require("../middleware/auth")
const router=express.Router()
router.use("/singup",singup)
router.use("/login",login)
router.get ("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"normal route"
    })
})

router.get("/student",auth,userauth,async(req,res)=>{
    res.json({
        success:true,
        message:"student route done!"

    })


})
router.get("/admin",auth,adminauth,(req,res)=>{

    res.json(
        {
            success:true,
            message:"admin route done! "
        }
    )
})

module.exports = router 