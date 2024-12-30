const router=require("express").Router()
const {z}=require("zod")
const User=require("../db.js").User
const { JWT_SECRET }=require("../config.js");
const { authMiddleware }=require("../middleware.js");
const Account=require("../db.js").Account
const jwt=require("jsonwebtoken")
const signupSchema = z.object({
    firstName: z.string(),
    lastName:z.string(),
    username: z.string().email(),
    password: z.string()
  });
  const signinSchema=z.object({
    username:z.string().email(),
    password:z.string()
  })
  router.post("/signup",async function(req,res){
    try{
    const firstName=req.body.firstName
    const lastName=req.body.lastName
    const username=req.body.username
    const password=req.body.password
   const ans=signupSchema.safeParse(req.body)
   if(!ans.success){
 return res.status(200).json({
    msg:"Incorrect inputs"
})
}
const pq=await User.findOne({username:username})
if(pq){
  return  res.status(200).json({
        msg:"Email already taken"
    })
}

const user=new User({firstName:req.body.firstName,lastName:req.body.lastName,username:req.body.username,password:req.body.password})
await user.save()
    const balance=Math.floor(Math.random() * 10000) + 1
    const acc=new Account({
        userId:user._id,
        balance:balance
    })
    await acc.save()
  return   res.status(200).json({
        msg:"User created successfully"
    })
    }catch(err){
res.status(200).json({
    msg:"Error while signup"
})
    }   
}
   
  )
router.post("/signin",async function(req,res){
    const username=req.body.username
    const password=req.body.password
    const ans=signinSchema.safeParse(req.body)
    if(!ans.success){
     return   res.json({
            msg:"Incorrect inputs"
        })
    }
    const user=await User.findOne({username:username})
    if(!user){
      return  res.json({
            msg:"User not found"
        })
    }
    if(user.password!=password){
      return   res.json({
            msg:"Incorrect password"
        })
    }
    const token=jwt.sign({
        userId:user._id
    },JWT_SECRET)
   return  res.status(200).json({
        token:token
    })
})
const updateSchema=z.object({
    password:z.string(),
    firstName:z.string(),
    lastName:z.string()
})

router.put("/update",authMiddleware,async function(req,res){
    try{const firstName=req.body.firstName
    const lastName=req.body.lastName
    const password=req.body.password
    const ans=updateSchema.safeParse(req.body)
    if(!ans.success){
     return   res.json({
            msg:"Error while updating information"
        })
    }
const user=await User.findOne({_id:req.userId})
user.firstName=firstName
user.lastName=lastName
user.password=password
await user.save()
res.json({
    msg:"Updated successfully"
})}catch(error){
    res.json({
        msg:"Error"
    })
}
})
router.get("/bulk",authMiddleware,async function(req,res){
const filter=req.query.filter || ""
const users=await User.find({
    $or:[{
        firstName:{
            $regex:filter
        }
    },{
        lastName:{
            $regex:filter
        }
    }

]
})
const currentUser=req.userId
res.json({
    users:users.map(function(user){
        if(user._id!=currentUser){
        return {
            user:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }}
    })
})
})



module.exports=router