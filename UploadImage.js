const router = require("express").Router();
const multer = require('multer');

const storage =  multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"images/posts/");
    },
    filename : (req,file,cb)=>{
        cb(null,req.body.name);
    }
});

const upload = multer({storage : storage});
router.post("/posts", upload.single("file") ,(req,res)=>{
    res.send({"message":"File uploaded"})
})

const userStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"images/users/");
    },
    filename : (req,file,cb)=>{
        cb(null,req.body.name);
    }
});

const uploadUser = multer({storage : userStorage});
router.post("/users", uploadUser.single("file") ,(req,res)=>{
    res.send({"message":"File uploaded"})
})
module.exports = router;