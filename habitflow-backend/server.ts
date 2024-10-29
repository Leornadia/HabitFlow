import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth';
import habitsRoutes from './src/routes/habits';
import journalRoutes from './src/routes/journal';
import checkinsRoutes from './src/routes/checkins';
import quotesRoutes from './src/routes/quotes';
import streaksRoutes from './src/routes/streaks';
import challengesRoutes from './src/routes/challenges';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitsRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/checkins', checkinsRoutes);
app.use('/api/quotes', quotesRoutes);
app.use('/api/streaks', streaksRoutes);
app.use('/api/challenges', challengesRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
