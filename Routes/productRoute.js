const express = require('express')

// const router = require("./categoryRoute");
const { addProduct } = require('../Controller/productController');
const upload = require('../utils/fileUplod');
const router = express.Router()
router.post('/addProduct',upload.single('product_image'),addProduct)
// router.post('/addproduct',addProduct)


module.exports = router