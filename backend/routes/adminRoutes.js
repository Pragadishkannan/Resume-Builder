const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  getStats,
  getTemplates,
  toggleTemplate,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All admin routes are protected + admin only
router.use(protect, adminOnly);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/stats', getStats);
router.get('/templates', getTemplates);
router.put('/templates/:id', toggleTemplate);

module.exports = router;
