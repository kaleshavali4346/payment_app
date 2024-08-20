const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:Skkv%402003@cluster0.0lcoi9h.mongodb.net/payment");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    secondName: String,
});

const User = mongoose.model("User",userSchema);

module.exports ={
    User
}