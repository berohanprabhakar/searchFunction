const Product = require('../model/ProductModel');
const redisClient = require('../dbconfig/redisconfig');


exports.searchProduct = async (req,res) =>{
    try {
        const {title, description} = req.query;

        const cacheKey = JSON.stringify({ title, description });

        // finding in redis Cache if response is present
        const cachedData = await redisClient.get(cacheKey);

        // if present then return from there
        if(cachedData){
            return res.json(JSON.parse(cachedData));
        }

        // not present then make query in database and add in redis as a key , value pair 
        // making query
        const query = {}
        if(title) query.title = { $regex : title, $options : 'i'}; // case sensitive search
        if(description) query.description = description;
        
        // finding product in db
        const productData = await Product.find(query);

        if(productData.length > 0){
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(productData)); // adding product info in redis cache for 1 hr
            res.json(productData);
        }else{
        // if product is not available
        res.status(404).json({message : "Not Avaialable"});
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Server Error"});
    }
}