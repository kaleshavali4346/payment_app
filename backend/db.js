const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:Skkv%402003@cluster0.0lcoi9h.mongodb.net/payment");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
});

const User = mongoose.model("User",userSchema);


const accountSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const Account = mongoose.model("Account",accountSchema);
module.exports ={
    User,
    Account,
};