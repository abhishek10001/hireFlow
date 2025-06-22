import express from 'express';
import multer from 'multer';
import userFormController from '../controllers/userFormController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /user-form - user submits form with file upload
router.post('/user-form', upload.single('cv'), userFormController.submitUserForm);

// GET /user-forms - get all user form submissions
router.get('/user-forms', userFormController.getUserForms);

export default router; 