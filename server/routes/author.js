import { Router } from 'express';

import { deleteAuthor, getAuthorsList, updateAuthorInfo } from '../controllers/author.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

/** GET: All Authors */
router.get('/', authMiddleware, getAuthorsList);

/** DELETE: Author */ 
router.delete('/:id', authMiddleware, deleteAuthor);

/** UPDATE: Name, Email, Password */
router.put('/update', authMiddleware, updateAuthorInfo);

export default router;