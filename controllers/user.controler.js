import UserSchema from "../models/user.model.js"
export const registerUser = (req, res) => {
    try {
        const body = req.body
        const user = new UserSchema(body)
        user.save()
        res.status(200).json({
            message: "User Added successfully",
            status :200
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Unable to process your request please try again",
            status :500
        })

    }

}

