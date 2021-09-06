const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
require("./db/db"); //db
app.use(express.json());

const auth = require("./Routes/auth");
const userRoute = require("./Routes/User");
const Posts = require("./Routes/Posts");
const Category = require("./Routes/Category");
const UploadImage = require("./UploadImage");

//routes
app.use("/api/auth",auth);
app.use("/api/user",userRoute);
app.use("/api/posts",Posts);
app.use("/api/category",Category);
app.use("/api/upload",UploadImage);


app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
})