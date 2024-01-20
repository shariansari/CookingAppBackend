
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const favrouiteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    recipe: {
        type: mongoose.Types.ObjectId,
        ref: "recipe",
        required: true
    },
  
}, {
    timestamps: true
});

favrouiteSchema.plugin(mongoosePaginate)

const FavrouiteModel = mongoose.model('favrouite', favrouiteSchema);
module.exports = FavrouiteModel
