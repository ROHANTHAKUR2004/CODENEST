import express from 'express';
import projectRouter from './project.js';
const router = express.Router();

router.use('/projects',projectRouter);


export default router;