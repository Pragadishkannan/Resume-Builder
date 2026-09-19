const User = require('../models/User');
const Resume = require('../models/Resume');
const Template = require('../models/Template');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent deleting self
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    // Delete user's resumes too
    await Resume.deleteMany({ user: req.params.id });
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User and their resumes deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalResumes = await Resume.countDocuments();
    const downloadStats = await Resume.aggregate([
      { $group: { _id: null, totalDownloads: { $sum: '$downloadsCount' } } },
    ]);
    const totalDownloads =
      downloadStats.length > 0 ? downloadStats[0].totalDownloads : 0;

    // Recent users (last 5)
    const recentUsers = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalResumes,
      totalDownloads,
      recentUsers,
    });
  } catch (error) {
    console.error('Get stats error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all templates
// @route   GET /api/admin/templates
// @access  Admin
const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({}).sort({ createdAt: 1 });
    res.json(templates);
  } catch (error) {
    console.error('Get templates error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Toggle template active status
// @route   PUT /api/admin/templates/:id
// @access  Admin
const toggleTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    template.isActive = !template.isActive;
    await template.save();

    res.json(template);
  } catch (error) {
    console.error('Toggle template error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getStats,
  getTemplates,
  toggleTemplate,
};
