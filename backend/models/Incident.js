const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            index: '2dsphere'
        },
        address: String,
        city: String,
        country: String
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    type: {
        type: String,
        enum: ['theft', 'accident', 'medical', 'lost', 'harassment', 'other'],
        required: true
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['reported', 'in-progress', 'resolved', 'closed'],
        default: 'reported'
    },
    images: [{
        url: String,
        publicId: String
    }],
    assignedTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ResponseTeam'
    },
    responseTime: {
        type: Number // in minutes
    },
    resolutionNotes: String,
    closedAt: Date
}, {
    timestamps: true
});

// Create 2dsphere index for location-based queries
incidentSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Incident', incidentSchema);