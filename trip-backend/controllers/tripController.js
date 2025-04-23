import Trip from '../models/Trip.js';
import User from '../models/User.js';

export async function getAllTrips(req, res) {
  const trips = await Trip.find();
  res.json(trips);
}

export async function getEnrolledTrips(req, res) {
  const user = await User.findById(req.user._id)
    .populate('enrolledTrips');
  res.json(user.enrolledTrips);
}

export async function getTripById(req, res) {
  const trip = await Trip.findById(req.params.id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  res.json(trip);
}

export async function createTrip(req, res) {
  const trip = await Trip.create(req.body);
  res.status(201).json(trip);
}

export async function updateTrip(req, res) {
  const trip = await Trip.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  res.json(trip);
}

export async function deleteTrip(req, res) {
  await Trip.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}

export async function enrollTrip(req, res) {
  const { id }    = req.params;
  const seats     = Number(req.body.seats) || 1;
  const trip      = await Trip.findById(id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });

  // 1) Create the Enrollment record
  const already = await Enrollment.findOne({
    user: req.user._id,
    trip: id
  });
  if (!already) {
    await Enrollment.create({
      user: req.user._id,
      trip: id,
      seats,
      status: 'Pending'
    });

    // 2) Also push into your Trip/User if you still want that
    trip.usersEnrolled.push(req.user._id);
    await trip.save();
  }

  return res.status(201).json({ success: true });
}
