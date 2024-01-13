const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/user", {
    useNewUrlParser: true, // Corrected property name
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connection successful`);
}).catch((e) => {
    console.log(`No connection: ${e.message}`);
}); 
