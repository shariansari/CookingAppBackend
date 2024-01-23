const express = require('express');
const RecipeModel = require('../models/recipe.model');
const FavrouiteModel = require('../models/favrouite.model');

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
    console.log("req---->", req.body);
    const userId = req.body.user
    console.log("userId", userId);
    const userFavrouiteRecipes = await FavrouiteModel.find({ user: { $in: userId } })

    const userfavrouiteIdsArray = userFavrouiteRecipes.map((favRecId) => favRecId.recipe.toString())


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
        const alphaNumericRegex = /^[A-Za-z0-9\s]+$/

        if (req.body.search.$text && alphaNumericRegex.test(req.body.search.$text.$search)) {
            const dynamicFieldValue = req.body.search.$text.$search.trim()
            const userId = req.body.user
            const schema = RecipeModel.schema;
            const fieldsToSearch = Object.keys(schema.paths).filter(
                (path) => schema.paths[path].instance === 'String'

            );
            const orConditions = fieldsToSearch.map((field) => ({
                [field]: { $regex: dynamicFieldValue, $options: "i" }
            }));


            const searchQuery = {
                $or: orConditions
            };

            RecipeModel.paginate(searchQuery, options, (err, doc) => {
                const updatedDocs = doc.docs.map((recipe) => {
                    return {
                        recipe,
                        isFavrouite: userfavrouiteIdsArray.includes(recipe._id.toString())
                    };
                });

                if (doc.docs.length !== 0) {
                    res.status(200).json({
                        data: updatedDocs,
                        status: 200
                    })
                }
                else {
                    res.status(500).json({
                        message: "no data found"
                    })

                }

            })


        } else {

            RecipeModel.paginate(req.body.search, options, (err, doc) => {
                const updatedDocs = doc.docs.map((recipe) => {
                    return {
                        recipe,
                        isFavrouite: userfavrouiteIdsArray.includes(recipe._id.toString())
                    };
                });
                
                // console.log("Updated Docs", updatedDocs);

                if (doc.docs.length !== 0) {
                    res.status(200).json({
                        data: updatedDocs,
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
