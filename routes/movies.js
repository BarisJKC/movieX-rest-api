const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Actor = require("../models/Actor");

router.get("/", async (req,res) => {
    const movies = await Movie.find().populate("actors");
    return res.send(movies);
});

router.get("/:id", async (req,res) => {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if(!movie) return res.status(404).send(`Movie with the ID ${movieId} not exist`);
    return res.send(movie);
});

router.post("/", async (req,res) => {
    const movie = new Movie(req.body); //data validasyonu yaptık varsaydıkk
    const saved = await movie.save();
    res.send(saved); // return süz de olur
});

router.put("/:id", async (req,res) => {
    const movieId = req.params.id;
    const updates = req.body;
    const movie = await Movie.findByIdAndUpdate(movieId,updates,{new:true,useFindAndModify:false});
    if(!movie) return res.status(404).send(`Movie with the ID ${movieId} not exist`);
    res.send(movie);
});

router.put("/:id/actors", async (req,res) => {
    const movieId = req.params.id;
    const actors = req.body;
    const movie = await Movie.findByIdAndUpdate(movieId,actors,{new:true,useFindAndModify:false});
    if(!movie) return res.status(404).send(`Movie with the ID ${movieId} not exist`);
    res.send(movie);
});



router.delete("/:id", async (req,res) => {
    const movieId = req.params.id;
    const movie = await Movie.findByIdAndDelete(movieId);
    if(!movie) return res.status(404).send(`Movie with the ID ${movieId} not exist`);
    res.send(movie);
});

router.get("/:id/actors", async (req,res) => {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId).populate("actors");
    if(!movie) return res.status(404).send(`Movie with the ID ${movieId} not exist`);
    res.send(movie.actors);
});

router.post("/:movieId/actors/:actorId", async (req,res) => {
    const movieId = req.params.movieId;
    const actorId = req.params.actorId;
    const movie = await Movie.findById(movieId).populate("actors");
    if(!movie) return res.status(404).send(`Movie with the ID ${movieId} not exist`);

    const actor = await Actor.findById(actorId);
    if(!actor) return res.status(404).send(`Actor with the ID ${actorId} not exist`);

    const isActorExist = movie.actors.find(actor => actorId===actor.id);
    // const isActorExist = movie.actors.includes(actorId); //populate kullanmadan
    if (isActorExist) return res.status(400).send(`Actor with the ID ${actorId} already exist in the movie ${movieId}`) 

    movie.actors.push(actor);
    await movie.save();
    // const updatedmovie = await Movie.findById(movieId).populate("actors"); //ilk find içinde populate kullanmaz isek
    // res.send(updatedmovie);
    res.send(movie);
});

module.exports = router;