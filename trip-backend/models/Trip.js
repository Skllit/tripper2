import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  title:         { type: String, required: true },
  startPoint:    { type: String, required: true },
  vehicle:       { type: String, required: true },
  date:          { type: Date,   required: true },             // ← new
  attractions:   [{ type: String }],
  cost:          { type: Number, required: true },
  totalSeats:    { type: Number, required: true },             // ← new
  seatsLeft:     { type: Number, required: true },             // ← new
  usersEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

// ensure seatsLeft initialized
tripSchema.pre('save', function(next) {
  if (this.isNew) this.seatsLeft = this.totalSeats;
  next();
});

export default mongoose.model('Trip', tripSchema);
