const mongoose = require('mongoose') 

const UserSchema = new mongoose.Schema({
    hand:{type:String, required:true, unique: true}
})