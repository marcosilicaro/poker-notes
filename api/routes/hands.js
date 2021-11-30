const router = require("express").Router()
const Hand = require("../models/Hand")

//CREATE HAND
router.post("/createHand", async (req, res) => {
  const newHand = new Hand({
    preflop: req.body.preflop,
    flop: req.body.flop,
    turn: req.body.turn,
    river: req.body.river
  });
  try {
    const hand = await newHand.save() // esperas a que hand se guarde en db para recibir la respuesta
    res.status(201).json(hand)
  } catch (err) {
    res.status(500).json(err)
  }
})

//CREATE HAND DIFERENTE -- BORRAR
router.post("/createHandDiferente", async (req, res) => {
  const newHand = new Hand(req.body);
  try {
    const savedHand = await newHand.save() // esperas a que hand se guarde en db para recibir la respuesta
    res.status(201).json(savedHand)
  } catch (err) {
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

//GET BY ID
router.get("/find/:id", async (req, res) => {
  try {
    const hand = await Hand.findById(req.params.id);
    res.status(200).json(hand);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET HANDS BY PARAMETER
router.get("/:parameter", async (req, res) => {
  //separamos parametro por '-' en una array
  arrParams = req.params.parameter.split("-")

  //descomprimimos los parametros
  heroPosition = arrParams[0] // ej: OOP
  instancia = arrParams[1] // ej: turn
  heroIniciativa = arrParams[2] // ej: CI
  boardType = arrParams[3] // ej: semimojado
  situation = arrParams[4] //ej: vs2ndbarrel

  if (instancia === 'preflop') {
    try {
      const hand = await Hand.find({
        'preflop.heroPosition': heroPosition,
        'preflop.heroIniciativa': heroIniciativa
      });
      res.status(200).json(hand);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (instancia === 'flop') {
    console.log(heroPosition)
    try {
      const hand = await Hand.find({
        'preflop.heroPosition': heroPosition,
        'flop.heroIniciativa': heroIniciativa,
        'flop.boardType': boardType,
        'flop.situation': situation
      });
      res.status(200).json(hand);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (instancia === 'turn') {
    try {
      const hand = await Hand.find({
        'preflop.heroPosition': heroPosition,
        'turn.heroIniciativa': heroIniciativa,
        'turn.boardType': boardType,
        'turn.situation': situation
      });
      res.status(200).json(hand);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (instancia === 'river') {
    try {
      const hand = await Hand.find({
        'preflop.heroPosition': heroPosition,
        'river.heroIniciativa': heroIniciativa,
        'river.boardType': boardType,
        'river.situation': situation
      });
      res.status(200).json(hand);
    } catch (err) {
      res.status(500).json(err);
    }
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