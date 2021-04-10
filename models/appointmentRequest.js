const mongoose = require('mongoose')
const { Schema } = mongoose;

const appointmentRequest = new Schema({
  isAccepted: { type: Boolean, required: false, default: false },
  requestedBy: { type: String, required: true }
},
{ 
  timestamps: true 
});

module.exports = mongoose.model('AppointmentRequest', appointmentRequest)