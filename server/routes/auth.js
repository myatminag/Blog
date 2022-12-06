import { Router } from 'express';

import { login, signup } from '../controllers/auth.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

/** POST: Login */
router.post('/login', login);

/** POST: Signup */
router.post('/signup', signup);

export default router;