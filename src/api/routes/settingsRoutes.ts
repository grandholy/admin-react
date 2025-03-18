import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Settings, { SettingsCreationAttributes } from '../models/Settings';

const router = express.Router();

// Get all settings
router.get('/', async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findAll();
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Get settings by key
router.get('/:key', async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOne({ where: { key: req.params.key } });
    if (!settings) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update or create settings
router.put(
  '/:key',
  [
    body('value').notEmpty().withMessage('Value is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const defaults: SettingsCreationAttributes = {
        key: req.params.key,
        value: req.body.value
      };

      const [settings, created] = await Settings.findOrCreate({
        where: { key: req.params.key },
        defaults
      });

      if (!created) {
        await settings.update({ value: req.body.value });
      }
      
      res.json(settings);
    } catch (error) {
      console.error('Error updating settings:', error);
      res.status(500).json({ error: 'Failed to update settings' });
    }
  }
);

// Create new settings
router.post(
  '/',
  [
    body('key').notEmpty().withMessage('Key is required'),
    body('value').notEmpty().withMessage('Value is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const existingSettings = await Settings.findOne({ where: { key: req.body.key } });
      if (existingSettings) {
        return res.status(400).json({ error: 'Settings with this key already exists' });
      }

      const settings = await Settings.create(req.body as SettingsCreationAttributes);
      res.status(201).json(settings);
    } catch (error) {
      console.error('Error creating settings:', error);
      res.status(500).json({ error: 'Failed to create settings' });
    }
  }
);

// Delete settings
router.delete('/:key', async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOne({ where: { key: req.params.key } });
    if (!settings) {
      return res.status(404).json({ error: 'Settings not found' });
    }

    await settings.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting settings:', error);
    res.status(500).json({ error: 'Failed to delete settings' });
  }
});

export default router; 