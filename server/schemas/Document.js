const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
    healthCardHASH: {
        type: String,
        required: true
    },
    documentHash: {
        type: Number,
        required: true
    }
});

const Document = mongoose.model('Document', documentSchema, 'Document');

module.exports = Document;



