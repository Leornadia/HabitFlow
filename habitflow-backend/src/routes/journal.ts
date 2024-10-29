import express, { Request, Response } from 'express';
import pool from '../db';
import { authenticateToken } from '../middleware';

const router = express.Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM journal_entries WHERE user_id = $1 ORDER BY created_at DESC', [(req as any).user.userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching journal entries' });
  }
});

router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const result = await pool.query(
      'INSERT INTO journal_entries (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [(req as any).user.userId, title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error creating journal entry' });
  }
});

router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await pool.query(
      'UPDATE journal_entries SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [title, content, id, (req as any).user.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error updating journal entry' });
  }
});

router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM journal_entries WHERE id = $1 AND user_id = $2 RETURNING *', [id, (req as any).user.userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    res.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting journal entry' });
  }
});

export default router;
