import express, { Request, Response, NextFunction } from 'express';
import pool from '../db';
import { authenticateToken } from '../middleware';

const router = express.Router();

router.get('/', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query('SELECT * FROM habits WHERE user_id = $1', [(req as any).user.userId]);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, status } = req.body;
    const result = await pool.query(
      'INSERT INTO habits (user_id, name, description, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [(req as any).user.userId, name, description, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const result = await pool.query(
      'UPDATE habits SET name = $1, description = $2, status = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [name, description, status, id, (req as any).user.userId]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Habit not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM habits WHERE id = $1 AND user_id = $2 RETURNING *', [id, (req as any).user.userId]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Habit not found' });
    } else {
      res.json({ message: 'Habit deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
