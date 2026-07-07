const Sequence = require('../models/sequence');

let maxDocumentId = 0;
let maxMessageId = 0;
let maxContactId = 0;
let sequenceId = null;

function SequenceGenerator() {
  this.initialize();
}

SequenceGenerator.prototype.initialize = async function() {
  try {
    let sequence = await Sequence.findOne().lean();

    if (!sequence) {
      sequence = await Sequence.create({
        _id: 'sequence',
        maxDocumentId: 0,
        maxMessageId: 0,
        maxContactId: 0
      });
    }

    sequenceId = sequence._id;
    maxDocumentId = sequence.maxDocumentId ?? 0;
    maxMessageId = sequence.maxMessageId ?? 0;
    maxContactId = sequence.maxContactId ?? 0;
  } catch (error) {
    console.error('Failed to initialize sequence generator:', error);
  }
};

SequenceGenerator.prototype.nextId = function(collectionType) {
  let updateObject = {};
  let nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId += 1;
      updateObject = { maxDocumentId };
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId += 1;
      updateObject = { maxMessageId };
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId += 1;
      updateObject = { maxContactId };
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  if (!sequenceId) {
    return nextId;
  }

  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
    .catch((error) => {
      console.log('nextId error = ' + error);
    });

  return nextId;
};

module.exports = new SequenceGenerator();
