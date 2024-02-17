const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    healthcardHASH: {
        type: String,
        required: false
    },
    passwordHASH: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        trim: true
    },
    familyClinicID: {
        type: Number,
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