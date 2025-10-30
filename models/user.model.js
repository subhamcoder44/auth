const mongoose=require("mongoose");
const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true

        },email:{
            type:String,
            unique:true,
            required:true
        },

        password:{
            type:String,
            unique:true,
            minlength:[5,"password 5 character"],
            required:true
        },
        role:{
            type:String,
            required:true,
            enum:['student','admin'],
            default:'user'
        }
    }
) 
const user=mongoose.model("user",userSchema)
module.exports=user;