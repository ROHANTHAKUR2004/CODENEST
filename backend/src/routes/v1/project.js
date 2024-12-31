import express from 'express';
import { createproject } from '../../controllers/projectController.js';

const router = express.Router();

router.post('/', createproject)

export default router;