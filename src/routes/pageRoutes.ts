import { Router } from 'express';
import {
  createPage,
  getAllPagesForCms,
  getPageById,
  getPageBySlug,
  updatePage,
  deletePage,
} from '../controllers/pageController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// --- Rotas Públicas ---
router.get('/pages/:slug', getPageBySlug);

// --- Rotas do CMS (Protegidas) ---
router.post('/cms/pages', authMiddleware, createPage);
router.get('/cms/pages', authMiddleware, getAllPagesForCms);
router.get('/cms/pages/:id', authMiddleware, getPageById);
router.put('/cms/pages/:id', authMiddleware, updatePage);
router.delete('/cms/pages/:id', authMiddleware, deletePage);

export default router;
