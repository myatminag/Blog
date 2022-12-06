import { Router } from 'express';
import multer from 'multer';

import { imageUpload } from '../controllers/uploadImage.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

const upload = multer();

/** Upload Image */
router.post('/', authMiddleware, upload.single('file'), imageUpload);

export default router;