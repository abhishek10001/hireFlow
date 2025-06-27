import express from 'express';
import adminFormController from '../controllers/adminFormController.js';
import hrController from '../controllers/hrController.js';
import { getApplicants } from '../controllers/applicantController.js';

const router = express.Router();

// --- HR Authentication ---
router.post('/signup', hrController.signUp);
router.post('/login', hrController.login);

// --- Admin Form Management (CRUD) ---
router.post('/admin-form', adminFormController.createAdminForm);
router.get('/admin-forms', adminFormController.getAdminForms);
router.get('/admin-form/:id', adminFormController.getAdminFormById);
router.put('/admin-form/:id', adminFormController.updateAdminForm);
router.delete('/admin-form/:id', adminFormController.deleteAdminForm);

router.get('/applicants', getApplicants);

export default router;