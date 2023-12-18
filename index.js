
const express = require("express")
const mongoose = require("mongoose")
const ip = require('ip')

const {registerUser,loginUser} =require('./controllers/user.controler.js')
const cors =require('cors')

const app = express();
const port = 3000; 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));



app.use(cors())

mongoose.connect('mongodb+srv://shariq:ansari@cluster0.9i2lw1n.mongodb.net/')
  .then(() => console.log('Connected!'))
  .catch((error)=>{
    console.log("eeroor",error);
  })
app.post('/createuser',registerUser);
app.post('/loginuser',loginUser);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  console.log("ip", ip.address());
