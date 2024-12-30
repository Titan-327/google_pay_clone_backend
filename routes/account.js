const { authMiddleware } = require("../middleware")
const mongoose=require("mongoose")
const JWT_SECRET=require("../config.js")
const jwt=require("jsonwebtoken")
const Account=require("../db.js").Account
const router=require("express").Router()
router.get("/balance",authMiddleware,async function(req,res){
    try{
const account=await Account.findOne({
    userId:req.userId
})
res.status(200).json({
    balance:account.balance
})}catch(err){
    res.json({
        msg:"Error"
    })
}
})
router.post("/transfer",authMiddleware,async function(req,res){
   try{ const session=await mongoose.startSession()
    session.startTransaction()
    const amount=req.body.amount
    const to=req.body.to
    const account=await Account.findOne({userId:req.userId}).session(session)
    if(!account||account.balance<amount){
        await session.abortTransaction()
        return res.status(200).json({
            msg:"Insufficient balance"
        })
    }
const toAccount=await Account.findOne({userId:to}).session(session)
if(!toAccount){
    await session.abortTransaction()
    return res.status(200).json({
        msg:"Invalid account"
    })
}
await Account.updateOne({userId:req.userId},{
    $inc:{
        balance: -amount
    }
}).session(session)
await Account.updateOne({userId:to},{
    $inc:{
        balance:amount
    }
}).session(session)
await session.commitTransaction();
return res.json({
    msg:"Transaction Successfull"
})}catch(error){
    res.json({
        msg:"Error"
    })
}


})




module.exports=router