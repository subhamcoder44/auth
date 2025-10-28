const user = require("../models/user.model");
const bcrypt = require("bcrypt");
exports.singup = async (req, res) => {
  try {
    let { username, email, password,role } = req.body;
    const checkmain = await user.findOne({ email });
    if (checkmain) {
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
    let hashpassowrd;
    try {
      hashpassowrd = await bcrypt.hash(password, 10);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "internal issue!",
      });
    }
    const createuser= await user.create({
        username,
        email,
        password:hashpassowrd,
        role
    })
     console.log(createuser)
    res.status(200).json(
        {
           
            success:true,
            message:'user created successfully'
        }
    )
    console.log(createuser);
  } catch (error) {
    console.log(error)
    res.status(500).json(
        {
            success:false,
            message:"code issue !"
        }
    )
  }
};
