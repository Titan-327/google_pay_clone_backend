const router=require("express").Router()
const accountRouter=require("./account.js")
const userRouter=require("./user.js")
router.use("/user",userRouter)
router.use("/account",accountRouter)
module.exports=router