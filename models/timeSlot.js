const mongoose = require('mongoose')
const { Schema } = mongoose;

const timeSlotSchema = new Schema({
  date: { type: Date, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  isBooked: { type: Boolean, required: true, default: false },
  appointmentRequests: [{ type: Schema.Types.ObjectId, ref: 'AppointmentRequest' }]
},
{ 
  timestamps: true 
});

module.exports = mongoose.model('TimeSlot', timeSlotSchema)