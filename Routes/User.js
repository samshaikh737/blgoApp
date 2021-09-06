const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { UserAuth, UserDeleteAuth } = require("../middleware/UserAuth");

router.get("/:id", async (req, res) => {
    try {
        if (req.body.id !== req.params.id) return res.status(400).send({ "error": "User not found" });
        const user = await User.findById(req.params.id);
        const { password, ...other } = user._doc;
        res.send(other);
    } catch (error) {
        console.log(error);
        res.status(400).send({ "error": "User not found" })
    }
})

// update user 
router.put("/:id", UserAuth, async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        const { password, ...other } = updateUser._doc;
        res.send(other);
    } catch (error) {
        res.status(400).send({ "error": "User Id not found" })
    }

})

//delete user
router.delete("/:id", UserDeleteAuth, async (req, res) => {
    await Post.deleteMany({ user: req.user._id });
    await User.findByIdAndDelete(req.body.id);
    res.send({ "message": "User deleted Successful" });
});


module.exports = router;