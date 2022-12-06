import { Router } from 'express';

import { deleteApply, getApply, getApplyDetail, postApply } from '../controllers/apply.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

/** POST: Apply */
router.post('/submit', postApply);

/** GET: All Apply */ 
router.get('/', getApply);

/** GET: Apply Detail */
router.get('/:id', getApplyDetail);

/** DELETE: */
router.delete('/:id', authMiddleware, deleteApply);

export default router;