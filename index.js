import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000; 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.post('/createuser', (req, res) => {
    res.json({
        "status":200,
        "message":"User Added Successfully"
    })
   
  });
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
