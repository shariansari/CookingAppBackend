
const CategoryModel = require('../models/category.model')

const express = require('express');
const RecipeModel = require('../models/recipe.model');

const recipeRouter = express.Router()



recipeRouter.post('/addRecipe', async (req, res) => {

    console.log("req", req.body);

    try {
        const body = req.body
        const recipe = new RecipeModel(body)
        recipe.save().then((doc) => {
            console.log("doc", doc)
        })
        res.status(200).json({
            message: "Recipe Added successfully",
            status: 200,
        })

    }
    catch (error) {
        console.log("error-----------", error)
        res.status(500).json({
            message: "Unable to process your request please try again",
            status: 500
        })

    }

})

recipeRouter.post('/getRecipe', async (req, res) => {

    console.log("req", req.body);


    try {
        const options = {
            page: req.body.page,
            limit: req.body.limit,
            collation: {
                locale: 'en',
                strength: 2
            },
            sort: { createdAt: -1 }
        }


        RecipeModel.paginate(req.body.search, options, (err, doc) => {
            console.log('doc', doc);

            if (doc.docs.length !== 0) {
                res.status(200).json({
                    data: doc,
                    status: 200
                })
            }
            else {
                res.status(500).json({
                    message: "no data found"
                })

            }



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




module.exports = { recipeRouter }
