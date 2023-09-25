const Category = require('../model/CategoryModel')


exports.addCategory = async (request, response) => {
    // check if category name already exists
    let category = await Category.findOne({ category_name: request.body.category_name })
    if (category) {
        return response.status(400).json({ error: "cartegory already exits" })
    }


    let categoryToadd = new Category({
        category_name: request.body.category_name
    })
    categoryToadd = await categoryToadd.save()
    if (!categoryToadd) {
        return response.status(400).json({ error: "Something went wrong" })
    }
    response.send(categoryToadd)
    // response.status(200),json(categoryToadd)

}
// {category_name:"Mobiles"}

//  to get all categories
exports.getAllCategories = async (req, res) => {
    let categories = await Category.find()
    if (!categories) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(categories)
}

// exports.getAllCategories = async(req,res)=>{
//     let categories = await Category.find()
//     if (!categories){
//         return res.status(400).json({error:"someting went wrong"})
//     }
//     res.send(categories) 
// }
// to get caasytegories details
exports.getcategorydetails = async (req, res) => {
    let category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(category)
}
// to update a category
exports.updateCategory = async (req, res) => {
    let categoryToUpdate = await Category.findByIdAndUpdate(req.params.id, {
        category_name: req.body.category_name
    }, { new: true })
    if (!categoryToUpdate) {
        return res.status(400).json({ error: "somthing went wrong" })
    }
    res.send(categoryToUpdate)
}
//  to delete category
exports.deleteCategory = (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then(categoryToDelete => {
            if (!categoryToDelete) {
                return res.status(400).json({error: "category not found" })
            }
            res.send({ message: "Category Deleted successfully" })
        })
        .catch(() => {
            return res.status(400).json({ error: "something went wrong" })
        })

}



/*
request - to take input from user/frontend
    .body-totake input using from
    .patams - to take input  using url 
    using variable

response- To send data/information to user/frontend
.send({}) - sends object in  status 200
status 200-ok
400-bad request
404- Not found
.stauts.json({})-sends object in status status_code


*/