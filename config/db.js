const mongoose = require("mongoose")
 



var connection = mongoose.connect('mongodb+srv://shariq:ansari@cluster0.9i2lw1n.mongodb.net/')
  .then(() => console.log('Connected!'))
  .catch((error)=>{
    console.log("eeroor",error);
  })



  module.exports = connection