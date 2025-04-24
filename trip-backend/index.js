// index.js
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes       from './routes/authRoutes.js';
import userRoutes       from './routes/userRoutes.js';
import tripRoutes       from './routes/tripRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// mount routers
app.use('/api/auth',        authRoutes);
app.use('/api/users',       userRoutes);
app.use('/api/trips',       tripRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

// connect & start
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI)    // no extra options needed on Mongoose >=6
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection error:', err);
  });
