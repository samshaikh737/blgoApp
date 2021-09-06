const mongoose = require('mongoose');
const url = process.env.MONGO_URL || "mongodb://localhost:27017/blogApp";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB is connected')).catch((err) => console.log(err));