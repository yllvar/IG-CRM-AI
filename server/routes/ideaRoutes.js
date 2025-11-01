import express from 'express';
import { generateIdea, getAllIdeas } from '../controllers/ideaController.js';

const router = express.Router();

router.post('/generate', generateIdea); // POST /api/ideas/generate
router.get('/', getAllIdeas);           // GET /api/ideas

export default router;
