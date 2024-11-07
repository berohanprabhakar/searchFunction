const express = require('express');
const { searchProduct } = require('../controller/searchController');
const router =  express.Router();

router.get('/search', searchProduct);

module.exports = router;