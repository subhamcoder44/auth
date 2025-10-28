const mongoose=require("mongoose");
function dbconnect(){
    mongoose.connect(process.env.MONGO_URI)
    .then(
        ()=>{
            console.log("connected");
            
        }
    ).catch(
        (err)=>{
                console.log("db crash"+err);
                
        }
    )
}
module.exports=dbconnect;