const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  ticketPrise: Number,
  ticketQuantity: Number,
  ticketType: { 
    type: String, 
    enum: ['standard', 'vip'], 
    required: true,
    default: 'standard' // type d'événement par défaut
  },
});

module.exports = mongoose.model("Tickets", TicketSchema);