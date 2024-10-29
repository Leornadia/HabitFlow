import express, { Request, Response } from 'express';
import pool from '../db';
import { authenticateToken } from '../middleware';

const router = express.Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM checkins WHERE user_id = $1 ORDER BY check_date DESC', [(req as any).user.userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching check-ins' });
  }
});

router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { habit_id, status, notes } = req.body;
    const result = await pool.query(
      'INSERT INTO checkins (user_id, habit_id, status, notes) VALUES ($1, $2, $3, $4) RETURNING *',
      [(req as any).user.userId, habit_id, status, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error creating check-in' });
  }
});

router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const result = await pool.query(
      'UPDATE checkins SET status = $1, notes = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [status, notes, id, (req as any).user.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Check-in not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error updating check-in' });
  }
});

router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM checkins WHERE id = $1 AND user_id = $2 RETURNING *', [id, (req as any).user.userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Check-in not found' });
    }
    res.json({ message: 'Check-in deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting check-in' });
  }
});

export default router;
