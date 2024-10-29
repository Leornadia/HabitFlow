import express from 'express';
import pool from '../db';
import { authenticateToken } from '../middleware';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM streaks WHERE user_id = $1', [(req as any).user.userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching streaks' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { habit_id, start_date, end_date, length } = req.body;
    const result = await pool.query(
      'INSERT INTO streaks (user_id, habit_id, start_date, end_date, length) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [(req as any).user.userId, habit_id, start_date, end_date, length]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error creating streak' });
  }
});

export default router;
