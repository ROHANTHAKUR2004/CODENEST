import express from 'express';
import { createproject, 
    getprojecttree } from '../../controllers/projectController.js';

const router = express.Router();

router.post('/', createproject);
router.get('/:projectId/tree', getprojecttree);

export default router;