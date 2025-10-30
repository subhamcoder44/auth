const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.singup = async (req, res) => {
  try {
    let { username, email, password, role } = req.body;
    const checkmain = await User.findOne({ email });
    if (checkmain) {
      return res.status(409).json({
        success: false,
        message: "user already exists",
      });
    }
    let hashpassowrd;
    try {
      hashpassowrd = await bcrypt.hash(password, 10);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "internal issue!",
      });
    }
    const createuser = await User.create({
      username,
      email,
      password: hashpassowrd,
      role
    })
    console.log(createuser)
    res.status(200).json(
      {
        success: true,
        message: 'user created successfully'
      }
    )
    console.log(createuser);
  } catch (error) {
    console.log(error)
    res.status(500).json(
      {
        success: false,
        message: "code issue !"
      }
    )
  }
};
exports.login = async (req, res) => {
  try{
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json(
        {
          success: false,
          message: "please fill blanks carefully"
        }
      )
    }  
    let user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({
        success:false,
        message:'user not found '
      })
    }
    let payload={
      email:user.email,
      role:user.role,
      id:user._id
    }
    if(await bcrypt.compare(password,user.password)){
      const token = jwt.sign(payload,
                        process.env.JWT_SECRET,{
                        expiresIn:"2h"
                        }
      )
      user = user.toObject();
      user.token = token
      user.password = undefined
      console.log(user)

      res.cookie("token",token).status(200).json({
        success:true,
        message:"user logedin successfully",
        token,
        user
      })
      return;
    }
    else{
      console.log("Invalid credentials")
      return res.status(400).json({
        success:false,
        message:"Invalid credentials"
      })
    }
  }catch(error){
    console.log(error)
    res.status(400).json(
      {
        success:false,
        message:"chud gaya"
      }
    )

  }
}
