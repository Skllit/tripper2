
import Trip from '../models/Trip.js';
import Enrollment from '../models/Enrollment.js';
import User from '../models/User.js';


export async function getEnrolledTrips(req, res) {
  const enrollments = await Enrollment.find({ user: req.user._id })
    .populate('trip');
  res.json(enrollments);
}

export async function getAllTrips(req, res) {
  const trips = await Trip.find();
  res.json(trips);
}

export async function getTripById(req, res) {
  const trip = await Trip.findById(req.params.id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  res.json(trip);
}

export async function createTrip(req, res) {
  const { title, startPoint, vehicle, date, attractions, cost, totalSeats, details } = req.body;

  const trip = new Trip({
    title,
    startPoint,
    vehicle,
    date,
    attractions,
    cost,
    totalSeats,
    details,
    seatsLeft: totalSeats // ✅ add this to satisfy the required field
  });

  try {
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
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
  const { id } = req.params;
  const seats = Number(req.body.seats) || 1;
  const trip = await Trip.findById(id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });

  if (trip.seatsLeft < seats) return res.status(400).json({ error: 'Not enough seats' });

  const user = req.user;
  const already = await Enrollment.findOne({ user: user._id, trip: id, status: { $ne: 'Canceled' } });
  if (already) return res.status(400).json({ error: 'Already booked' });

  const enrollment = await Enrollment.create({
    user: user._id,
    trip: id,
    seats,
    customerEmail: user.email
  });

  // 🆕 Add enrollment to user.enrolledTrips
  user.enrolledTrips.push(enrollment._id);
  await user.save(); // <- don't forget this!

  trip.usersEnrolled.push(user._id);
  trip.seatsLeft -= seats;
  await trip.save();

  res.status(201).json(enrollment);
}
