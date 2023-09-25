// const Product = require('../model/CategoryModel')
// exports.addProduct
const Product = require('../model/ProductModel')
// to add new product
exports.addProduct = async (req, res) => {
    
    if (!req.file){
        return res.status(400).json({error:"product Image is required"})
    }
    let productToAdd = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        count_in_stock: req.body.count_in_stock,
        product_image: req.file.path,
        category: req.body.category

    })
    productToAdd = await productToAdd.save()
    if (!productToAdd){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(productToAdd)
}


exports.getProductByCategories = async (req, res) => {
    let products = await Product.find({ Category: req.params.category }).populate('category', 'category_name')
    if (!products) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(products)
}

exports.getProductDetails = async (req, res) => {
    let product = await Product.findById({ Category: req.params.id }).populate('category', 'category_name')
    if (!product) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(product)
}
// ro update

// get related producs
