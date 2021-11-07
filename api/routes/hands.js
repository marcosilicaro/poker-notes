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

//UPDATE

router.put("/:id", async (req, res) => {
      try {
        const updatedHand = await Hand.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedHand);
      } catch (err) {
        res.status(500).json(err);
      }
  });

//DELETE

router.delete("/:id", async (req, res) => {
      try {
        await Hand.findByIdAndDelete(req.params.id);
        res.status(200).json("The hand has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
  });

//GET
router.get("/find/:id", async (req, res) => {
    try {
      const hand = await Hand.findById(req.params.id);
      res.status(200).json(hand);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET ALL

router.get("/", async (req, res) => {
      try {
        const hands = await Hand.find();
        res.status(200).json(hands.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
  });

module.exports = router