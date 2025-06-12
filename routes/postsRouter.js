import { Router } from 'express';
import validateBody from '../middlewares/validateBody.js';
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from '../controllers/posts.js';
import { postSchema } from '../zod/schemas.js';
import verifyToken from '../middlewares/verifyToken.js';

const postsRouter = Router();

postsRouter.route('/').get(getAllPosts).post(validateBody(postSchema), verifyToken, createPost);

postsRouter
  .route('/:id')
  .get(getSinglePost)
  .put(validateBody(postSchema), verifyToken, updatePost)
  .delete(verifyToken, deletePost);

export default postsRouter;
