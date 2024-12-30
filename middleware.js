const {JWT_SECRET}=require("./config.js")
const jwt=require("jsonwebtoken")
const authMiddleware=function(req,res,next){
    const authHeader=req.headers.authorization
    if(!authHeader||!authHeader.startsWith("Bearer ")){
        res.status(411).json({
            msg:"Authentication failed"
        })
    }
    const token=authHeader.split(" ")[1]
    try{
const decoded=jwt.verify(token,JWT_SECRET)
if(decoded){
req.userId=decoded.userId
next()}
else{
    res.status(403).json({
        msg:"Authentication failed"
    })
}
    }catch(error){
res.status(403).json({
msg:"Authentication failed"
})
    }
}
module.exports={
    authMiddleware
}