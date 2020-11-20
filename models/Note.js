const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },

  
});

module.exports = mongoose.model('Note', NoteSchema);
