const router = require("express").Router();
const CategoryMidd = require("../middleware/CategoryMidd");
const Category = require("../models/Category");

//get all category
router.get("/",async (req,res)=>{
    const allCategory = await Category.find();
    res.send(allCategory);
});

//add category
router.post("/", CategoryMidd ,async (req,res)=>{
    const newCategory = await new Category(req.body).save();
    res.send(newCategory);
});

module.exports = router;