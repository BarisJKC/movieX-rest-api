const mongoose = require("mongoose");

const actorsSchema = new mongoose.Schema ({
    name: String,
    surname: String,
    birthdate: Date,
    hasOscar: {type:Boolean,default:false},
    gender: {type: String, enum: ["female","male"]} // büyük harf küçük harf sensitivedir. büyük harf ile yazılanı kabul etmez
})

module.exports = mongoose.model("Actor",actorsSchema);