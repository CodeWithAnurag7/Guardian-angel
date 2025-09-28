const express = require('express');
const {
    getDashboardStats,
    getRecentIncidents
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/stats', protect, getDashboardStats);
router.get('/incidents', protect, getRecentIncidents);

module.exports = router;