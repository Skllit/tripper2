import Trip from '../models/Trip.js';
import User from '../models/User.js';

export async function getAllTrips(req, res) {
  const trips = await Trip.find();
  res.json(trips);
}

export async function getEnrolledTrips(req, res) {
  // populate this user's enrolledTrips
  const user = await User.findById(req.user._id).populate('enrolledTrips');
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
  const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  res.json(trip);
}

export async function deleteTrip(req, res) {
  await Trip.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}

export async function enrollTrip(req, res) {
  const trip = await Trip.findById(req.params.id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });

  const user = await User.findById(req.user._id);
  if (!user.enrolledTrips.includes(trip._id)) {
    user.enrolledTrips.push(trip._id);
    trip.usersEnrolled.push(user._id);
    await user.save();
    await trip.save();
  }
  res.json({ success: true });
}
