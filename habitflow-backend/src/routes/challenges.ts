import express from 'express';
import pool from '../db';
import { authenticateToken } from '../middleware';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM challenges WHERE user_id = $1', [(req as any).user.userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching challenges' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, start_date, end_date } = req.body;
    const result = await pool.query(
      'INSERT INTO challenges (user_id, name, description, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [(req as any).user.userId, name, description, start_date, end_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error creating challenge' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, start_date, end_date } = req.body;
    const result = await pool.query(
      'UPDATE challenges SET name = $1, description = $2, start_date = $3, end_date = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
      [name, description, start_date, end_date, id, (req as any).user.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error updating challenge' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM challenges WHERE id = $1 AND user_id = $2 RETURNING *', [id, (req as any).user.userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error:  'Challenge not found' });
    }
    res.json({ message: 'Challenge deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting challenge' });
  }
});

export default router;
