const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  _id: { type: String, default: 'sequence' },
  maxDocumentId: { type: Number, default: 0 },
  maxMessageId: { type: Number, default: 0 },
  maxContactId: { type: Number, default: 0 }
});

module.exports = mongoose.models.Sequence || mongoose.model('Sequence', sequenceSchema);
