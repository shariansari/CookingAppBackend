import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import {registerUser} from './controllers/user.controler.js'

const app = express();
const port = 3000; 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

mongoose.connect('mongodb+srv://Shariq:Tetrahedral135@cluster0.og22izb.mongodb.net/')
  .then(() => console.log('Connected!'))
  .catch((error)=>{
    console.log("eeroor",error);
  })

app.post('/createuser',registerUser);
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
