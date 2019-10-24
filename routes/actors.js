const express = require("express");
const router = express.Router();
const Actor = require ("../models/Actor");

router.get("/", async (req,res) => {
    const actors = await Actor.find().select("name");
    res.send(actors);
});

router.get("/:id", async (req,res) => {
    const actorId = req.params.id;
    const actor = await Actor.findById(actorId);
    if(!actor) return res.status(404).send(`Actor with the Id ${actorId} not exist`);
    res.send(actor);
});

router.post("/", async (req,res) => {
    const actor = new Actor(req.body);
    const saved = await actor.save();
    res.send(saved);
});


router.put("/:id", async (req,res) => {
    const actorId = req.params.id;
    const updates = req.body;
    const actor = await Actor.findByIdAndUpdate(actorId,updates,{new:true,useFindAndModify:false});
    if(!actor) return res.status(404).send(`Actor with the Id ${actorId} not exist`);
    res.send(actor);    
});

router.delete("/:id", async (req,res) => {
    const actorId = req.params.id;
    const actor = await Actor.findByIdAndDelete(actorId);
    if(!actor) return res.status(404).send(`Actor with the Id ${actorId} not exist`);
    res.send(actor);
});

module.exports = router;