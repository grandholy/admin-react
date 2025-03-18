import express, { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import Theme from '../models/Theme';

const router = express.Router();

// Get all themes
router.get('/', async (req: Request, res: Response) => {
  try {
    const themes = await Theme.findAll();
    res.json(themes);
  } catch (error) {
    console.error('Error fetching themes:', error);
    res.status(500).json({ error: 'Failed to fetch themes' });
  }
});

// Get theme by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const theme = await Theme.findByPk(req.params.id);
    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' });
    }
    res.json(theme);
  } catch (error) {
    console.error('Error fetching theme:', error);
    res.status(500).json({ error: 'Failed to fetch theme' });
  }
});

// Get default theme
router.get('/default/active', async (req: Request, res: Response) => {
  try {
    const theme = await Theme.findOne({ where: { isDefault: true } });
    if (!theme) {
      return res.status(404).json({ error: 'No default theme found' });
    }
    res.json(theme);
  } catch (error) {
    console.error('Error fetching default theme:', error);
    res.status(500).json({ error: 'Failed to fetch default theme' });
  }
});

// Create new theme
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('primary').notEmpty().withMessage('Primary color is required'),
    body('secondary').notEmpty().withMessage('Secondary color is required'),
    body('background').notEmpty().withMessage('Background color is required'),
    body('sidebarBackground').notEmpty().withMessage('Sidebar background color is required'),
    body('headerBackground').notEmpty().withMessage('Header background color is required'),
    body('textPrimary').notEmpty().withMessage('Primary text color is required'),
    body('textSecondary').notEmpty().withMessage('Secondary text color is required'),
    body('menuItemBackground').notEmpty().withMessage('Menu item background color is required'),
    body('menuItemSelectedBackground').notEmpty().withMessage('Selected menu item background color is required'),
    body('menuItemText').notEmpty().withMessage('Menu item text color is required'),
    body('menuItemSelectedText').notEmpty().withMessage('Selected menu item text color is required'),
    body('menuItemHoverBackground').notEmpty().withMessage('Menu item hover background color is required'),
    body('menuItemHoverText').notEmpty().withMessage('Menu item hover text color is required'),
  ],
  async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const theme = await Theme.create(req.body);
      res.status(201).json(theme);
    } catch (error) {
      console.error('Error creating theme:', error);
      res.status(500).json({ error: 'Failed to create theme' });
    }
  }
);

// Update theme
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const theme = await Theme.findByPk(req.params.id);
    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' });
    }

    await theme.update(req.body);
    res.json(theme);
  } catch (error) {
    console.error('Error updating theme:', error);
    res.status(500).json({ error: 'Failed to update theme' });
  }
});

// Set theme as default
router.patch('/:id/set-default', async (req: Request, res: Response) => {
  try {
    const theme = await Theme.findByPk(req.params.id);
    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' });
    }

    await theme.update({ isDefault: true });
    res.json(theme);
  } catch (error) {
    console.error('Error setting default theme:', error);
    res.status(500).json({ error: 'Failed to set default theme' });
  }
});

// Delete theme
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const theme = await Theme.findByPk(req.params.id);
    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' });
    }

    if (theme.isDefault) {
      return res.status(400).json({ error: 'Cannot delete the default theme' });
    }

    await theme.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting theme:', error);
    res.status(500).json({ error: 'Failed to delete theme' });
  }
});

export default router; 