
import mongoose from "mongoose";

const adminSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"pls add a name"]
    },
    email:{
        type:String,
        required:[true,"pls add an email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"pls add a password"]
    },
})

const Admin= mongoose.model("Admin", adminSchema);

export default Admin;