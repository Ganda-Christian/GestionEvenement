const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { 
    type: String, 
    enum: ['national', 'international'], 
    required: true,
    default: 'national'
  },
  type: { 
    type: String, 
    enum: ['concert', 'festival', 'conference', 'seminar'], 
    required: true,
    default: 'concert'
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL de l'image
  likes: { type: Number, default: 0 }, // Nombre de likes
});

module.exports = mongoose.model("Event", EventSchema);
