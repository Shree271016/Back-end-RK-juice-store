const {check,validationResult}= require('express-validator')
// category validation
exports.categoryRules = [
    check('category_name',"Category name is required.").notEmpty()
    .isLength({min:3}).withMessage("Category name must be at least 3 charactors.")
    .matches(/[a-z A-Z  ]+$/).withMessage("category name must contain only alphabets.")
    .not().isIn(['test','TEST']).withMessage("test is not a valid category.")
]
exports.validationCheck =(req,res,next)=>{
    const errors = validationResult(req)
    if (errors.isEmpty()){
        return next()
    }
   return  res.status(400).json({error:errors.array()[0].msg})
}
exports.productRules = [
    check('product_name','Product name is required').notEmpty()
    .isLength({min:3}).withMessage("Product name must be at least 3 charactors"),


    check ('product_price',"prosuct price is required ").notEmpty()
    .isNumeric().withMessage("product price must be  number only"),

    check ('count_in_stock',"count in stock  is required ").notEmpty()
    .isNumeric().withMessage("count in stock  must be  number only"),
    
    check ('product_description',"production description  is required ").notEmpty()
    .isNumeric({min:30}).withMessage("production description must be  at least 30 charactors."),
    
    check ('category',"category  is required ").notEmpty()
    .matches(/^[a-fA-Z0-9]{24}$/).withMessage("category is invalid")

]
exports.userCheck = [
    check('username','username is required').notEmpty()
    .isLength({min:3}).withMessage("Username must be at least 3 characters"),
    check('email',"Email is required").notEmpty()
    .isEmail().withMessage("Email format incorrect"),
    check('password','password is required').notEmpty()
    .isLength({min:8}).withMessage("Password must be at least 8 characters")
    .not().isIn(['asdf1234','password','12345678']).withMessage("Password cannot use common words")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase character")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase character")
    .matches(/[0-9]/).withMessage("Password must contain at least one numeric character")
    .matches(/[-_+!@#$%^]/).withMessage("Password must contain at least one special character")
    .not().matches(/[\\;:.,]/).withMessage("\ ; : . and , are not allowed in password")
]