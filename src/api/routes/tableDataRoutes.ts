import express, { Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';
import TableData from '../models/TableData';
import { Op } from 'sequelize';

const router = express.Router();

// Get all table data with pagination, sorting, and filtering
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const sortField = (req.query.sortField as string) || 'id';
    const sortOrder = (req.query.sortOrder as string) === 'desc' ? 'DESC' : 'ASC';
    const search = req.query.search as string;
    const category = req.query.category as string;
    const status = req.query.status as string;

    // Build where conditions
    const whereConditions: any = {};
    
    // Add search condition
    if (search) {
      whereConditions[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }
    
    // Add category filter
    if (category) {
      whereConditions.category = category;
    }
    
    // Add status filter
    if (status) {
      whereConditions.status = status;
    }

    // Get data with pagination and total count
    const { count, rows } = await TableData.findAndCountAll({
      where: whereConditions,
      order: [[sortField, sortOrder]],
      limit,
      offset,
    });

    // Get all available categories and statuses for filters
    const categories = await TableData.findAll({
      attributes: ['category'],
      group: ['category'],
    });
    
    const statuses = await TableData.findAll({
      attributes: ['status'],
      group: ['status'],
    });

    res.json({
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
      filters: {
        categories: categories.map(c => c.category),
        statuses: statuses.map(s => s.status),
      },
    });
  } catch (error) {
    console.error('Error fetching table data:', error);
    res.status(500).json({ error: 'Failed to fetch table data' });
  }
});

// Get table data by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await TableData.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching table data:', error);
    res.status(500).json({ error: 'Failed to fetch table data' });
  }
});

// Create new table data
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('status').notEmpty().withMessage('Status is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('stock').isInt().withMessage('Stock must be an integer'),
  ],
  async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const data = await TableData.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      console.error('Error creating table data:', error);
      res.status(500).json({ error: 'Failed to create table data' });
    }
  }
);

// Update table data
router.put(
  '/:id',
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty'),
    body('status').optional().notEmpty().withMessage('Status cannot be empty'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('stock').optional().isInt().withMessage('Stock must be an integer'),
  ],
  async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const data = await TableData.findByPk(req.params.id);
      if (!data) {
        return res.status(404).json({ error: 'Data not found' });
      }

      await data.update(req.body);
      res.json(data);
    } catch (error) {
      console.error('Error updating table data:', error);
      res.status(500).json({ error: 'Failed to update table data' });
    }
  }
);

// Delete table data
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const data = await TableData.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }

    await data.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting table data:', error);
    res.status(500).json({ error: 'Failed to delete table data' });
  }
});

export default router; 