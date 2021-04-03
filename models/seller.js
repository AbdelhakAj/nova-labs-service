const mongoose = require("mongoose");
const { Schema } = mongoose;

const sellerSchema = new Schema({
  fullName: { type: String, required: true, unique : true, trim: true },
  timeSlots: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }]
},
{ 
  timestamps: true 
});

module.exports = mongoose.model('Seller', sellerSchema)