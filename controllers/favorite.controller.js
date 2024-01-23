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
            res.status(200).json({
                message: "Favrouite Added successfully",
                status: 200,
                _id:doc.recipe
            })
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
            sort: { createdAt: -1 },
            populate :"recipe"
        }


        FavrouiteModel.paginate(req.body.search, options,async (err, doc) => {
            if (doc.docs.length !== 0) {
                const result = {
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





favrouiteRouter.post('/deleteFavrouite', async (req, res) => {
    console.log("req", req.body);
    const { recipe, user } = req.body;

    try {
        if (!recipe || !user) {
            return res.status(400).json({
                message: 'Please provide both recipeId and userId in the request body',
                status: 400
            });
        }

        const existingFavorite = await FavrouiteModel.findOne({ recipe: recipe, user: user });

        if (!existingFavorite) {
            return res.status(404).json({
                message: 'Favorite not found',
                status: 404
            });
        }

        await existingFavorite.deleteOne();

        res.status(200).json({
            message: 'Favorite deleted successfully',
            status: 200
        });
    } catch (error) {
        console.error('Error deleting favorite:', error);
        res.status(500).json({
            message: 'Unable to delete favorite. Please try again.',
            status: 500
        });
    }

})



module.exports = { favrouiteRouter }
