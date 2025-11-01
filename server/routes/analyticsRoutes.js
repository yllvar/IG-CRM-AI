import express from 'express';
import { getAnalytics,  exportAnalytics, seedAnalytics } from '../controllers/analyticsController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/data', getAnalytics); // GET /api/analytics/data

router.get('/data', verifyToken, getAnalytics);
router.get('/export', verifyToken, exportAnalytics); 
router.post('/seed', seedAnalytics);

export default router;
