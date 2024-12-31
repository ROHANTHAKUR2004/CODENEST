import express from 'express';
import { pingCheck } from '../../controllers/pingController.js';
import projectRouter from './project.js';
const router = express.Router();

router.use('/p', pingCheck);

router.use('/projects',projectRouter);


export default router;