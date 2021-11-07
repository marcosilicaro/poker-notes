const router = require("express").Router()
const Hand = require("../models/Hand")

//CREATE HAND
router.post("/createHand", async (req,res)=>{
    const newHand = new Hand({
        //pitoduro:req.body.pitoduro
        preflop:req.body.preflop,
        flop:req.body.flop,
        turn:req.body.turn,
        river:req.body.river
    });
    try{
        const hand = await newHand.save() // esperas a que hand se guarde en db para recibir la respuesta
    res.status(201).json(hand)
    }catch(err){
        res.status(500).json(err)
    }  
})

module.exports = router