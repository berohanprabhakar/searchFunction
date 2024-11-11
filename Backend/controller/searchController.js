const Product = require('../model/ProductModel');
const redisClient = require('../dbconfig/redisconfig');


exports.searchProduct = async (req, res) => {
    try {
        const { searchText } = req.query; 

        if (!searchText) {
            return res.status(400).json({ message: "Search text is required" });
        }


        const cacheKey = JSON.stringify({ searchText });


        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }


        const query = {
            $or: [
                { title: { $regex: searchText, $options: 'i' } }, 
                { description: { $regex: searchText, $options: 'i' } } 
            ]
        };

        
        const productData = await Product.find(query).lean(); 

        if (productData.length > 0) {
           
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(productData));
            res.json(productData);
        } else {
           
            res.status(404).json({ message: "Not Available" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};
