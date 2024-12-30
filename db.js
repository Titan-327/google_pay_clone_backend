const mongoose=require("mongoose")
const conn=async function(){
    try{
    await mongoose.connect("mongodb+srv://titansingh327:Pokemons%40123@cluster0.6xc0q.mongodb.net/").then(function(){
        console.log("Database connected")
    })}catch(error){
        console.log("Database not connected")
    }
}
conn();
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const accountSchema=mongoose.Schema({
 userId:{
type:mongoose.Schema.Types.ObjectId,
required:true,
ref:"User"
 },
 balance:{
    type:Number,
    required:true
 }
})
const User=mongoose.model("User",userSchema)
const Account=mongoose.model("Account",accountSchema)
module.exports={
    User,
    Account
}