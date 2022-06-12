const express = require ("express")
require('dotenv').config({path:'./config/.env'})
const app = express ()
const  connect  = require("./config/connectdb")
const Food = require("./models/User")
const PORT = process.env.PORT ||5000
connect()

//parsing middleware
app.use(express.json())

// ADD A NEW USER TO THE DATABASE 
app.post("/post", async(req, res)=>{
  const {food,isHealthy} = req.body
  try {
    const newFood =await new Food({
      food,
      isHealthy
    })
    await newFood.save()
    await res.send(newFood)
    res.status(201)
  } catch (error) {
    console.error(error.message);
    res.status(401)
  }
})
//RETURN ALL USERS 
app.get("/get",async(req, res)=>{
  const foods = await Food.find()
 
  res.send(foods)
})
//update existing element
app.put("/edit/:id",async(req,res)=>{
  
  try {
    
    const updatedEl = await Food.findByIdAndUpdate(req.params.id,{...req.body},{new :true})
    await res.send(updatedEl)
  } catch (error) {
    console.error(error)
  }

})
app.delete("/delete/:id", async(req,res)=>{
  try {
    const deletedUser = await Food.findByIdAndDelete(req.params.id)
    await res.send(`this user has been deleted ${deletedUser}`)
  } catch (error) {
    console.error(error)
  }
})
 
app.listen(PORT, (err)=> err?console.error(err):console.log(`server is listening on port ${PORT}`) )