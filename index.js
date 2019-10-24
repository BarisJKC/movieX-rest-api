const express = require("express");
const mongoose = require("mongoose");
// const config = require("config");
const mongodbURL = require("./config/mongodb");

const moviesRoutes = require("./routes/movies");
const actorsRoutes = require("./routes/actors");

const app=express();

mongoose
    .connect (mongodbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log("Error",err.message));

app.use(express.json()); //Accept json format for request body

app.use("/movies",moviesRoutes);
app.use("/actors",actorsRoutes);

const PORT= process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));