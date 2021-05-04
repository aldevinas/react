const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const recipeSchema = new Schema({

    title:{
        type: String,
        required: true
    },
    image:{
        type: Array,
        required: true
    },
    ingredients:{
        type: Array,
        required: true
    },
    preparation:{
        type: Array,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("recipes", recipeSchema)