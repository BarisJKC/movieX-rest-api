const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema ({
    name:String,
    description:String,
    genre:[String],
    actors: [{type:mongoose.Schema.Types.ObjectId , ref:"Actor"}], // birden fazla actor olduğu için array olması
    isNominated:{type:Boolean , default:false},
    released:Number,
    URL:String
});

module.exports = mongoose.model("Movie", movieSchema);
