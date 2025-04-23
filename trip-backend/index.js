// index.js (ES Module compatible)
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',        authRoutes);
app.use('/api/users',       userRoutes);
app.use('/api/trips',       tripRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

// Connect DB and start server
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });
