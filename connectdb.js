const mongoose = require('mongoose')
const connect = async()=>{

  try {
   await mongoose.connect(process.env.url)
    await console.log("database connected");
  } catch (error) {
    console.error(error.message)
  }
}
module.exports = connect