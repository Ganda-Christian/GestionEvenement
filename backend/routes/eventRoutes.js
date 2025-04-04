const express = require('express');
const router = express.Router();
const Event = require('../models/event');


//Route pour liker un evenement
router.post("/like/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Événement non trouvé" });

    event.likes += 1; // Incrémentation du like
    await event.save();
    res.json({ likes: event.likes });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Récupérer tous les événements
router.get("/events", async (req, res) => {
    const events = await Event.find();
    res.json(events);
  });
  
  // Ajouter un événement
  router.post("/events", async (req, res) => {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.json(newEvent);
  });
  
  // Modifier un événement
  router.put("/events/:id", async (req, res) => {
    await Event.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Événement mis à jour" });
  });
  
  // Supprimer un événement
  router.delete("/events/:id", async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Événement supprimé" });
  });

  module.exports = router;