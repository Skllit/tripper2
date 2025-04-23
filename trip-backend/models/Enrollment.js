import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trip:   { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  seats:  { type: Number, default: 1 },
  status: { type: String, enum: ['Pending','Approved','Rejected'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Enrollment', enrollmentSchema);
