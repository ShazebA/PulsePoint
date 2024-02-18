const mongoose = require('mongoose');

const User = mongoose.Schema({
    clinicName: {
        type: String,
        required: true
    },
    clinicAddress: {
        type: String,
        required: true
    },
    clinicPhoneNumber: {
        type: String,
        required: true
    },
    clinicEmail: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true
    },
    clinicWebsite: {
        type: String,
        required: false
    }
});

// isActive
// isVerified
// clinicName - required
// clinicAddress - required
// clinicPhoneNumber - required
// clinicEmail - not required
// clinicWebsite - not required