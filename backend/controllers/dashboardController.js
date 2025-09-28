const Incident = require('../models/Incident');
const User = require('../models/User');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
    try {
        const today = new Date();
        const startOfToday = new Date(today.setHours(0, 0, 0, 0));
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // Get various statistics
        const [
            totalIncidents,
            incidentsToday,
            incidentsThisWeek,
            incidentsThisMonth,
            activeTourists,
            responseTeams,
            resolvedIncidents
        ] = await Promise.all([
            Incident.countDocuments(),
            Incident.countDocuments({ createdAt: { $gte: startOfToday } }),
            Incident.countDocuments({ createdAt: { $gte: startOfWeek } }),
            Incident.countDocuments({ createdAt: { $gte: startOfMonth } }),
            User.countDocuments({ role: 'tourist', lastLogin: { $gte: startOfToday } }),
            // Assuming you have a ResponseTeam model
            // ResponseTeam.countDocuments({ status: 'active' }),
            12, // Mock data for now
            Incident.countDocuments({ status: 'resolved' })
        ]);

        // Get incidents by type
        const incidentsByType = await Incident.aggregate([
            {
                $group: {
                    _id: '$type',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get incidents by severity
        const incidentsBySeverity = await Incident.aggregate([
            {
                $group: {
                    _id: '$severity',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            success: true,
            data: {
                metrics: {
                    activeTourists,
                    incidentsToday,
                    responseTeams,
                    systemUptime: 98.5, // Mock system uptime percentage
                    totalIncidents,
                    resolvedIncidents,
                    resolutionRate: totalIncidents > 0 ? 
                        ((resolvedIncidents / totalIncidents) * 100).toFixed(1) : 0
                },
                charts: {
                    incidentsByType,
                    incidentsBySeverity,
                    weeklyTrend: await getWeeklyTrend(),
                    hotspots: await getHotspotLocations()
                }
            }
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard statistics'
        });
    }
};

// Helper function to get weekly trend
const getWeeklyTrend = async () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));
        
        const count = await Incident.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });
        
        days.push({
            date: startOfDay.toISOString().split('T')[0],
            incidents: count
        });
    }
    return days;
};

// Helper function to get hotspot locations
const getHotspotLocations = async () => {
    return [
        { location: 'Paris', tourists: 247, incidents: 3 },
        { location: 'Dubai', tourists: 189, incidents: 1 },
        { location: 'Tokyo', tourists: 312, incidents: 2 },
        { location: 'New York', tourists: 198, incidents: 4 },
        { location: 'London', tourists: 275, incidents: 2 }
    ];
};

// @desc    Get recent incidents
// @route   GET /api/dashboard/incidents
// @access  Private
const getRecentIncidents = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        
        const incidents = await Incident.find()
            .populate('reportedBy', 'name email')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        
        const total = await Incident.countDocuments();
        
        res.json({
            success: true,
            data: {
                incidents,
                pagination: {
                    current: page,
                    pages: Math.ceil(total / limit),
                    total
                }
            }
        });
    } catch (error) {
        console.error('Recent incidents error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching recent incidents'
        });
    }
};

module.exports = {
    getDashboardStats,
    getRecentIncidents
};