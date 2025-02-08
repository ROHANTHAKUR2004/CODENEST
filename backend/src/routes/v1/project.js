import express from 'express';
import { createproject, 
    getAllProjectsController, 
    getprojecttree } from '../../controllers/projectController.js';

const router = express.Router();

router.post('/', createproject);
router.get('/:projectId/tree', getprojecttree);

router.get('/projectlist' , getAllProjectsController)

export default router;