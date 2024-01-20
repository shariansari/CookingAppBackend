const express = require('express');
const favrouiteSchema = require('../models/favrouite.model');
const FavrouiteModel = require('../models/favrouite.model');
const RecipeModel = require('../models/recipe.model');

const favrouiteRouter = express.Router()



favrouiteRouter.post('/addFavrouite', async (req, res) => {
    console.log("req", req.body);

    try {
        const body = req.body
        const favrouite = new favrouiteSchema(body)
        favrouite.save().then((doc) => {
            console.log("doc", doc)
        })
        res.status(200).json({
            message: "Favrouite Added successfully",
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

favrouiteRouter.post('/getFavrouite', async (req, res) => {


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


        FavrouiteModel.paginate(req.body.search, options,async (err, doc) => {


            console.log('docsdvsdsdvsdvsdcv', doc.docs);

            console.log('doc', doc);

            const recipeIds = doc.docs.map(favorite => favorite.recipe);
            const recipes = await RecipeModel.find({ _id: { $in: recipeIds } });



            console.log("recipeIds",recipeIds);
            console.log("recipes",recipes);



            if (doc.docs.length !== 0) {
                const result = {
                    // favorites: doc,
                    recipes: recipes
                };
                console.log("result",result);


                res.status(200).json({
                    data: result,
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



module.exports = { favrouiteRouter }
