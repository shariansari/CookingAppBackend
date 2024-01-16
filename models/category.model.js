
const mongoose =require('mongoose')
const mongoosePaginate =  require('mongoose-paginate-v2')

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true 
});

categorySchema.plugin(mongoosePaginate)

const CategoryModel = mongoose.model('category', categorySchema);
module.exports = CategoryModel
