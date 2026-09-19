const express = require('express');
const router = express.Router();
const {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  duplicateResume,
  getSharedResume,
  incrementDownload,
} = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

// Public route - shared resume
router.get('/shared/:slug', getSharedResume);

// Protected routes
router.route('/').get(protect, getResumes).post(protect, createResume);

router
  .route('/:id')
  .get(protect, getResumeById)
  .put(protect, updateResume)
  .delete(protect, deleteResume);

router.post('/:id/duplicate', protect, duplicateResume);
router.put('/:id/download', protect, incrementDownload);

module.exports = router;
