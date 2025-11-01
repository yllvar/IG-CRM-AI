
import { Parser } from 'json2csv';
import fs from 'fs';
import Analytics from '../models/Analytics.js';
import path from 'path';
const analyticsJsonPath = path.resolve('./data/analytics.json');
const data = JSON.parse(fs.readFileSync(analyticsJsonPath, 'utf-8'));

// SEEDING DB
export const seedAnalytics = async (req, res) => {
  try {
    await Analytics.deleteMany(); 
    const analytics = new Analytics(req.body);
    await analytics.save();
    res.status(201).json({ message: 'Analytics seeded successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Seeding failed', details: err.message });
  }
};

// GET from DB
export const getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.findOne();
    if (!analytics) return res.status(404).json({ error: 'No analytics data found' });
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: 'Error loading analytics from DB' });
  }
};

// EXPORT CSV
export const exportAnalytics = async (req, res) => {
  try {
    const fileData = JSON.parse(fs.readFileSync('./data/analytics.json', 'utf-8'));
    const parser = new Parser();
    const csv = parser.parse(fileData.engagement);
    res.header('Content-Type', 'text/csv');
    res.attachment('analytics.csv');
    return res.send(csv);
  } catch (e) {
    res.status(500).json({ error: 'Export error' });
  }
};
