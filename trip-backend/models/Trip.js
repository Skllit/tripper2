import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  title:         { type: String, required: true },
  startPoint:    { type: String, required: true },
  vehicle:       { type: String, required: true },
  attractions:   [{ type: String }],
  cost:          { type: Number, required: true },
  details:       { type: String },
  usersEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model('Trip', tripSchema);
