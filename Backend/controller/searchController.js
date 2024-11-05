const Product = require('../model/ProductModel');


const searchProduct = (req,res) =>{
    try {
        const {title, description} = req.query;

        // making query
        const query = {}
        if(title) query.title = { $regex : title, $options : 'i'}; // case sensitive search
        if(description) query.description = description;
        
        //finding in redis

    } catch (error) {
        
    }
}