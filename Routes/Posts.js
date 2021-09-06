const router = require("express").Router();
const { addPostMidd, updatePostMidd, deletePostMidd } = require("../middleware/PostsMidd");
const Post = require("../models/Post");
const User = require("../models/User");


//get all Post
router.get("/", async (req, res) => {
    const user = req.query?.user;
    const category = req.query?.category;
    let posts;

    try {
        if (user) {
            const author = await User.findOne({username: user});
            posts = await Post.find({user: author?._id}); 
        }else if(category){
            posts = await Post.find({ category : { $in : [category] } });
        }else {
            posts = await Post.find();
        }
        res.send(posts)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

});

//get Post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(400).send({"error":"Post Not Found"});
        return res.json(post);
    } catch (error) {
        res.status(400).send({"error":"Post Not Found"});
    }
});

//add post
router.post("/", addPostMidd, async (req, res) => {
    const newPost = await new Post(req.body).save();
    res.send(newPost);
});

//update post
router.put("/:id", updatePostMidd, async (req, res) => {
    const updatePost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.send(updatePost);
});

router.delete("/:id", deletePostMidd, async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.send("Post deleted")
});

module.exports = router;