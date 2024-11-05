const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type : Number,
        required: true,
    },
    seller:{
        type : String,
    }

})

// creating model with schema
module.exports = mongoose.model('Product', ProductSchema);