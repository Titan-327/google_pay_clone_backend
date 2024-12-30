const express=require("express")
const app=express()
app.use(express.json())
const cors=require("cors")
app.use(cors())
const mainRouter=require("./routes/index.js")

app.use("/api/v1",mainRouter)

app.listen(3000,function(){
    console.log("active")
})