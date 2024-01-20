
const express = require("express")
const ip = require('ip')
const cors = require('cors')
const {userRouter} = require("./controllers/user.controler.js")
const {categoryRouter} = require("./controllers/category.controller.js")
const {recipeRouter} = require("./controllers/recipe.controller.js")
const {favrouiteRouter} = require("./controllers/favorite.controller.js")


const connection  = require("./config/db.js")

const app = express();
const port = 3000;

// Middleware always on TOP
// app.use(authMiddleware) -- will use this in every private Route
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Route Middleware
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/recipe', recipeRouter)
app.use('/api/favrouite', favrouiteRouter)




app.listen(port, async () => {
  try {
    await connection
    console.log(`Server is running on port ${port}`);

  } catch (error) {
    console.log("error at listen", error)
  }
});



console.log("ip", ip.address());


