const UserModel = require('../models/user.model.js')
 const registerUser = (req, res) => {

    console.log("req",  req.body);
    try {
        const body = req.body
        const user = new UserModel(body)
        user.save().then((doc)=>{
            console.log("doc", doc)
        })
        res.status(200).json({
            message: "User Added successfully",
            status :200
        })
    }
    catch (error) {
        console.log("error", error)
        res.status(500).json({
            message: "Unable to process your request please try again",
            status :500
        })

    }

}
const loginUser = (req, res) => {
    console.log("req",  req.body);
    const {email, password} = req.body

    if(!email && !password){
        return res.status(201).send({message : "Login not avaialble", status:201})
    }else{
        try {
            UserModel.find({email, password}).select('-password').then((doc)=>{
                return res.status(201).send({doc : doc, status:201})
            }).catch((err)=>{
                console.log("err", err)
            })
        } catch (error) {
            
        }
    }
   

}

module.exports = {registerUser,loginUser}

