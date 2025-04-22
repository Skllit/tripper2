// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Trip from './models/Trip.js';

dotenv.config();

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/tripPlanner';

const dummyUsers = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'AdminPass123',
    role: 'admin'
  },
  {
    name: 'Regular User',
    email: 'user@example.com',
    password: 'UserPass123',
    role: 'user'
  }
];

const dummyTrips = [
  {
    title: 'Beach Getaway',
    startPoint: 'Miami, FL',
    vehicle: 'Bus',
    attractions: ['South Beach', 'Art Deco Historic District'],
    cost: 199.99,
    details: 'Relax on pristine sands and explore pastel‑colored architecture.'
  },
  {
    title: 'Mountain Hiking Adventure',
    startPoint: 'Denver, CO',
    vehicle: 'Van',
    attractions: ['Rocky Mountain National Park', 'Bear Lake'],
    cost: 349.50,
    details: 'Guided hikes through alpine meadows, includes meals and gear.'
  },
  {
    title: 'City Cultural Tour',
    startPoint: 'New York, NY',
    vehicle: 'Subway & Walking',
    attractions: ['Metropolitan Museum of Art', 'Broadway Show', 'Central Park'],
    cost: 249.00,
    details: 'A deep dive into NYC’s art, theater, and landmarks.'
  },
  {
    title: 'Desert Safari',
    startPoint: 'Phoenix, AZ',
    vehicle: '4x4 Jeep',
    attractions: ['Sonoran Desert', 'Camel Ride', 'Stargazing Camp'],
    cost: 299.00,
    details: 'Off‑road dunes, cultural demos, and night under the stars.'
  },
  {
    title: 'Wine Country Escape',
    startPoint: 'Napa Valley, CA',
    vehicle: 'Limousine',
    attractions: ['Vineyard Tours', 'Wine Tastings', 'Gourmet Lunch'],
    cost: 399.99,
    details: 'Luxury transport between top wineries with a private sommelier.'
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO);
    console.log('Connected to MongoDB');

    // CLEAR existing
    await User.deleteMany({});
    await Trip.deleteMany({});
    console.log('Cleared Users & Trips');

    // CREATE Users (with hashed passwords)
    for (const u of dummyUsers) {
      await User.create({
        name: u.name,
        email: u.email,
        password: u.password, // plain password; schema will hash it
        role: u.role
      });
    }
    
    // CREATE Trips
    for (let t of dummyTrips) {
      await Trip.create(t);
      console.log(`Created trip: ${t.title}`);
    }

    console.log('✅ Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
