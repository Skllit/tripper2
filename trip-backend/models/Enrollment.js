import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  user:               { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trip:               { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  seats:              { type: Number, default: 1 },
  customerEmail:      { type: String, required: true },         // ← new
  bookingDate:        { type: Date, default: Date.now },        // ← new
  status:             { type: String, enum: ['Pending','Approved','Rejected','Canceled'], default: 'Pending' },
  canceledAt:         { type: Date },                           // ← new
  cancellationCharge: { type: Number }                         // ← new
}, { timestamps: true });

export default mongoose.model('Enrollment', enrollmentSchema);
