import express, { Request, Response } from 'express';
import pool from '../db';
import { authenticateToken } from '../middleware';

const router = express.Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1');
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quote' });
  }
});

router.get('/favorites', authenticateToken, async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM favorite_quotes WHERE user_id = $1', [(req as any).user.userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching favorite quotes' });
  }
});

router.post('/favorites', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { quote_id } = req.body;
    const result = await pool.query(
      'INSERT INTO favorite_quotes (user_id, quote_id) VALUES ($1, $2) RETURNING *',
      [(req as any).user.userId, quote_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error adding favorite quote' });
  }
});

router.delete('/favorites/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM favorite_quotes WHERE id = $1 AND user_id = $2 RETURNING *', [id, (req as any).user.userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Favorite quote not found' });
    }
    res.json({ message: 'Favorite quote removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing favorite quote' });
  }
});

export default router;
