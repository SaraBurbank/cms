const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String },
    url: { type: String, required: true },
    children: []
});

module.exports = mongoose.models.Document || mongoose.model('Document', documentSchema);
