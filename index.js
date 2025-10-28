const express=require("express");
const app=express();
const dotenv=require("dotenv");
dotenv.config()
const db=require("./config/db.js")
db();
app.use(express.json());
const userroute=require("./routes/user.route.js");
app.use("/user",userroute);

const PORT=process.env.PORT;



app.listen(PORT,()=>{
    console.log("app running on port http://localhost:"+PORT)
});