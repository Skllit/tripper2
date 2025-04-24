import Enrollment from '../models/Enrollment.js';
import Trip from '../models/Trip.js';

export const getAllEnrollments = async (req, res) => {
  const list = await Enrollment.find()
    .populate('user','name email')
    .populate('trip','title date cost');
  res.json(list);
};

export const updateEnrollmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const enr = await Enrollment.findByIdAndUpdate(id, { status }, { new: true });
  if (!enr) return res.status(404).json({ error: 'Not found' });
  res.json(enr);
};

export const cancelEnrollment = async (req, res) => {
  const { id } = req.params;
  const enr = await Enrollment.findById(id).populate('trip');
  if (!enr) return res.status(404).json({ error: 'Not found' });
  if (enr.status === 'Canceled') return res.status(400).json({ error: 'Already canceled' });

  // charge 20% of total cost
  const charge = enr.trip.cost * enr.seats * 0.2;
  enr.status = 'Canceled';
  enr.canceledAt = new Date();
  enr.cancellationCharge = charge;
  await enr.save();

  // restore seats
  const trip = await Trip.findById(enr.trip._id);
  trip.seatsLeft += enr.seats;
  await trip.save();

  res.json(enr);
};
