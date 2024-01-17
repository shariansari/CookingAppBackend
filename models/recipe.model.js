
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    duration : {
        type: String,
        required: true,
        trim: true,

    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category",
        required: true
    },


}, {
    timestamps: true
});

recipeSchema.plugin(mongoosePaginate)

const RecipeModel = mongoose.model('recipe', recipeSchema);
module.exports = RecipeModel