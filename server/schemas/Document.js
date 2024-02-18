const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
    healthCardHASH: {
        type: String,
        required: true
    },
    documentIndex: {
        type: Number,
        required: true
    }
});

const Document = mongoose.model('Document', documentSchema, 'Document');

module.exports = Document;



