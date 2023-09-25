const express = require("express")
const { addCategory, getAllCategories, getcategorydetails, updateCategory, deleteCategory } = require("../Controller/categoryController")
const { categoryRules, validationCheck } = require("../vallidators/Validation")
const { authorize } = require("../Controller/userController")
const router = express.Router()

router.post('/addcategory',categoryRules,validationCheck, authorize, addCategory)
router.get('/getallcategories',getAllCategories)
router.get('/categorydetail/:id',getcategorydetails)
router.put('/updatecategory/:id',authorize , updateCategory)
router.delete('/deletecategory/:id',authorize , deleteCategory)


module.exports = router