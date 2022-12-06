import Router from 'express';

import { createNewPost, deletePost, getAllPost, getCategory, getPostDetails, getPostList, getSearchPost, getSummary, updatePost } from '../controllers/post.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

/** GET: All Post */
router.get('/', getAllPost);

/** GET: Detail Post */
router.get('/post/:id', getPostDetails);

/** GET: Post List */
router.get('/admin', getPostList);

/** CREATE: New Post */
router.post('/create', authMiddleware, createNewPost);

/** UPDATE: Post */
router.put('/post/:id', authMiddleware, updatePost);

/** DELETE: Post */
router.delete('/post/:id', authMiddleware, deletePost);

/** GET: Summary */
router.get('/summary', getSummary);

/** GET: Categories */
router.get('/category', getCategory);

/** GET: Search Post */
router.get('/articles', getSearchPost);

export default router;