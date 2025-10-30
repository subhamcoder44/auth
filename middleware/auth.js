const jwt=require("jsonwebtoken");
require("dotenv").config();
exports.auth=async(req,res,next)=>{
const token=req.body.token;
if(!token){
  return   res.status(400).json({
        success:false,
        message:"token is missing"
    })
}
try{
 const decode=  jwt.verify(token,process.env.JWT_SECRET)

req.user=decode;
next();
}catch(error){

console.log(error);

res.status(400).json({
    success:false,
    message:"decode error"
})
}
}

exports.userauth=(req,res,next)=>{
try{
    if(req.user.role!=="student"){
     return   res.ststus(400).json({
           success:false,
            message:"studen router protected invalid token" 
        }
        )
    }
next();
}catch(error){
console.log(error)
res.status(400).json({
    success:false,
    message:"chude gaya"
})
}
}


exports.adminauth=(req,res,next)=>{
try{
    if(req.user.role!=="admin"){
       return res.ststus(400).json({
            success:false,
            message:"studen router protected invalied token" 
        }
        )
    }
    next();

}catch(error){
console.log(error)
res.status(400).json({
    success:false,
    message:"chude gaya"
})
}
}