const mongoose = require("mongoose")

require("dotenv").config()




mongoose.set('debug', true)

var connection = mongoose.connect(process.env.mongoURL)
    .then(() => console.log('Connected!'))
    .catch((error) => {
      console.log("eeroor", error);
    })








module.exports = connection