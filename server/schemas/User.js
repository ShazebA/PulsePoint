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
        trim: true,
        lowercase: true,
        required: true,
        unique: true
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
        required: false,
        default: "000000000000"
    },
    dateOfBirth: {
        type: Date,
        trim: true,
        required: false
    },
    familyClinicID: {
        type: Number,
        required: false
    },
    dependants: {
        type: Array,
        required: false
    },
    isClinic: {
        type: Boolean,
        required: true,
        default: false
    }
});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;



