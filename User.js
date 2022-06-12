const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  food:{type:String,required:true},
  isHealthy:Boolean


})
module.exports= mongoose.model("Food",schema)