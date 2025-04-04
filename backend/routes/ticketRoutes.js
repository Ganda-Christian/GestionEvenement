const express = require('express');
const router = express.Router();
const Ticket = require('../models/Tickets');

// Récupérer tous les tickets
router.get("/tickets", async (req, res) => {
    const tickets = await Ticket.find();
    res.json(tickets);
  });
  
  // Ajouter un ticket
  router.post("/tickets", async (req, res) => {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.json(newTicket);
  });
  
  // Modifier un événement
  router.put("/tickets/:id", async (req, res) => {
    await Ticket.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Ticket mis à jour" });
  });
  
  // Supprimer un événement
  router.delete("/tickets/:id", async (req, res) => {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: "Ticket supprimé" });
  });

  module.exports = router;