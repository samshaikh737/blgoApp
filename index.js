const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");

require("dotenv").config();
require("./db/db"); //db
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use('/api/images',express.static(path.join(__dirname,"images")));

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