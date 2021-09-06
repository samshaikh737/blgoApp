const router = require("express").Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"images");
    },
    filename : (req,file,cb)=>{
        cb(null,"hello.png");
    }
});

const upload = multer({storage : storage});
router.post("/", upload.single("file") ,(req,res)=>{
    res.send({"message":"File uploaded"})
})

module.exports = router;