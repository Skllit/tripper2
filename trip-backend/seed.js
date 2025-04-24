// trip-backend/seed.js
import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import Trip from './models/Trip.js';
import Enrollment from './models/Enrollment.js';

async function seed() {
  console.log('⏳ Connecting to MongoDB…');
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this for recent MongoDB drivers
  });
  console.log('✅ MongoDB connected');

  // 1️⃣ Clear existing data
  await Promise.all([
    Enrollment.deleteMany({}),
    Trip.deleteMany({}),
    User.deleteMany({}),
  ]);
  console.log('🗑️  Cleared Users, Trips & Enrollments');

  // 2️⃣ Create users (admin and regular)
  console.log('👥 Creating users…');
  const [admin, alice, bob, charlie] = await User.create([
    {
      name: 'Admin User',
      email: 'admin@trip.com',
      password: 'adminpass',
      role: 'admin',
    },
    {
      name: 'Alice Traveler',
      email: 'alice@trip.com',
      password: 'alicepass',
      role: 'user',
    },
    {
      name: 'Bob Voyager',
      email: 'bob@trip.com',
      password: 'bobpass',
      role: 'user',
    },
    {
      name: 'Charlie Explorer',
      email: 'charlie@trip.com',
      password: 'charliepass',
      role: 'user',
    },
  ]);
  console.log(`   • Admin:    ${admin.email}`);
  console.log(`   • Regular:  ${alice.email}`);
  console.log(`   • Regular:  ${bob.email}`);
  console.log(`   • Regular:  ${charlie.email}`);

  // 3️⃣ Create trips with more data
  console.log('🚍 Creating trips…');
  const trips = await Trip.create([
    {
      title: 'Savannah Safari Adventure',
      startPoint: 'Nairobi, Kenya',
      vehicle: 'Luxury 4x4 Jeep with pop-up roof',
      attractions: ['Maasai Mara Game Reserve', 'Serengeti Plains', 'Ngorongoro Crater'],
      cost: 2500,
      details: 'An unforgettable 7-day safari exploring the best wildlife spots in East Africa.',
      totalSeats: 12,
      seatsLeft: 10,
      date: new Date('2025-07-10'),
      itinerary: [
        'Day 1: Arrival in Nairobi and transfer to lodge.',
        'Day 2-4: Game drives in Maasai Mara.',
        'Day 5: Fly to Serengeti.',
        'Day 6: Explore Ngorongoro Crater.',
        'Day 7: Departure.',
      ],
      highlights: ['Witness the Great Migration', 'Spot the Big Five', 'Cultural visit to a Maasai village'],
      difficulty: 'Easy to Moderate',
      duration: '7 Days',
      image: 'https://via.placeholder.com/800x450/FFC107/000000?Text=Savannah+Safari',
    },
    {
      title: 'Andean Trek to Machu Picchu',
      startPoint: 'Cusco, Peru',
      vehicle: 'Private van, hiking',
      attractions: ['Sacred Valley', 'Inca Trail (short version)', 'Machu Picchu'],
      cost: 1800,
      details: 'A breathtaking 4-day trek through the stunning Andean landscapes to the lost city of the Incas.',
      totalSeats: 16,
      seatsLeft: 12,
      date: new Date('2025-08-05'),
      itinerary: [
        'Day 1: Explore Cusco and the Sacred Valley.',
        'Day 2: Trek along the Inca Trail.',
        'Day 3: Arrival at Machu Picchu.',
        'Day 4: Explore Machu Picchu and return to Cusco.',
      ],
      highlights: ['Incredible mountain views', 'Ancient Inca ruins', 'The iconic Machu Picchu'],
      difficulty: 'Moderate to Challenging',
      duration: '4 Days',
      image: 'https://via.placeholder.com/800x450/4CAF50/FFFFFF?Text=Machu+Picchu+Trek',
    },
    {
      title: 'Southeast Asian Island Hopping',
      startPoint: 'Bangkok, Thailand',
      vehicle: 'Ferry, speedboat',
      attractions: ['Phi Phi Islands', 'Railay Beach', 'James Bond Island'],
      cost: 950,
      details: 'A fun-filled 10-day adventure exploring the beautiful islands of Thailand.',
      totalSeats: 30,
      seatsLeft: 28,
      date: new Date('2025-09-15'),
      itinerary: [
        'Day 1-3: Explore Bangkok.',
        'Day 4-6: Island hopping in Phi Phi.',
        'Day 7-8: Relax at Railay Beach.',
        'Day 9: Visit James Bond Island.',
        'Day 10: Departure from Phuket.',
      ],
      highlights: ['Stunning beaches', 'Snorkeling and diving', 'Vibrant nightlife'],
      difficulty: 'Easy',
      duration: '10 Days',
      image: 'https://via.placeholder.com/800x450/2196F3/FFFFFF?Text=Island+Hopping+Thailand',
    },
    {
      title: 'European City Explorer',
      startPoint: 'Paris, France',
      vehicle: 'High-speed train, public transport',
      attractions: ['Eiffel Tower', 'Colosseum', 'Sagrada Familia'],
      cost: 1500,
      details: 'A classic 12-day tour visiting iconic cities in Europe.',
      totalSeats: 20,
      seatsLeft: 15,
      date: new Date('2025-10-01'),
      itinerary: [
        'Day 1-3: Paris, France.',
        'Day 4-6: Rome, Italy.',
        'Day 7-9: Barcelona, Spain.',
        'Day 10-12: London, UK.',
      ],
      highlights: ['World-famous landmarks', 'Rich history and culture', 'Delicious cuisine'],
      difficulty: 'Easy to Moderate',
      duration: '12 Days',
      image: 'https://via.placeholder.com/800x450/9C27B0/FFFFFF?Text=European+City+Tour',
    },
  ]);
  trips.forEach(t =>
    console.log(`   • ${t.title} on ${t.date.toDateString()}`)
  );

  // 4️⃣ Enroll users in trips with different statuses and seat counts
  console.log('✍️  Creating Enrollments…');

  // Alice's enrollments
  await Enrollment.create([
    {
      user: alice._id,
      trip: trips[0]._id, // Savannah Safari
      seats: 2,
      status: 'Approved',
      customerEmail: alice.email,
      bookingDate: new Date('2025-06-01'),
    },
    {
      user: alice._id,
      trip: trips[1]._id, // Andean Trek
      seats: 1,
      status: 'Pending',
      customerEmail: alice.email,
      bookingDate: new Date('2025-07-15'),
    },
  ]);
  console.log('   • Alice enrolled in Savannah Safari (Approved, 2 seats)');
  console.log('   • Alice enrolled in Andean Trek (Pending, 1 seat)');

  // Bob's enrollments
  await Enrollment.create([
    {
      user: bob._id,
      trip: trips[0]._id, // Savannah Safari
      seats: 3,
      status: 'Approved',
      customerEmail: bob.email,
      bookingDate: new Date('2025-06-05'),
    },
    {
      user: bob._id,
      trip: trips[2]._id, // Southeast Asian Island Hopping
      seats: 2,
      status: 'Approved',
      customerEmail: bob.email,
      bookingDate: new Date('2025-09-01'),
    },
    {
      user: bob._id,
      trip: trips[3]._id, // European City Explorer
      seats: 1,
      status: 'Canceled',
      customerEmail: bob.email,
      bookingDate: new Date('2025-09-20'),
      canceledAt: new Date('2025-09-25'),
      cancellationCharge: 50,
    },
  ]);
  console.log('   • Bob enrolled in Savannah Safari (Approved, 3 seats)');
  console.log('   • Bob enrolled in Southeast Asian Island Hopping (Approved, 2 seats)');
  console.log('   • Bob enrolled in European City Explorer (Canceled, 1 seat)');

  // Charlie's enrollments
  await Enrollment.create([
    {
      user: charlie._id,
      trip: trips[1]._id, // Andean Trek
      seats: 2,
      status: 'Approved',
      customerEmail: charlie.email,
      bookingDate: new Date('2025-07-20'),
    },
    {
      user: charlie._id,
      trip: trips[3]._id, // European City Explorer
      seats: 2,
      status: 'Pending',
      customerEmail: charlie.email,
      bookingDate: new Date('2025-09-25'),
    },
    {
      user: charlie._id,
      trip: trips[2]._id, // Southeast Asian Island Hopping
      seats: 1,
      status: 'Rejected',
      customerEmail: charlie.email,
      bookingDate: new Date('2025-09-05'),
    },
  ]);
  console.log('   • Charlie enrolled in Andean Trek (Approved, 2 seats)');
  console.log('   • Charlie enrolled in European City Explorer (Pending, 2 seats)');
  console.log('   • Charlie enrolled in Southeast Asian Island Hopping (Rejected, 1 seat)');

  console.log('🌱 Database seeded successfully!');
  mongoose.connection.close();
}

seed().catch(err => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});