const UserModel = require('../models/user.model.js')

const express = require('express')

const userRouter = express.Router()
trainerRouter.use(express.json());
app.use(express.urlencoded({ extended: true }));


userRouter.post('/createuser', async (req, res) => {
    console.log("req", req.body);
    try {
        const body = req.body
        const user = new UserModel(body)
        user.save().then((doc) => {
            console.log("doc", doc)
        })
        res.status(200).json({
            message: "User Added successfully",
            status: 200
        })
    }
    catch (error) {
        console.log("error", error)
        res.status(500).json({
            message: "Unable to process your request please try again",
            status: 500
        })

    }
})

userRouter.post('/loginuser', async (req, res) => {
    console.log("req", req.body);
    const { email, password } = req.body

    if (!email && !password) {
        return res.status(201).send({ message: "Login not avaialble", status: 200 })
    }

    const user = UserModel.find({ email: email })
    user.then((doc) => {
        console.log("doc",doc);

        if (doc.length == 0) {
            console.log("inside 1")

            return res.status(401).send({ message: "User does not exist", status: 400 });

        }
        else if (password !== doc[0].password) {
            return res.status(401).send({ message: "Wrong Credential", status: 400 })
        }
        else {
            console.log("inside 3")

            res.json({doc :doc, message: `login successfully`, status: 200 });

        }



    })

})







module.exports = { userRouter }

