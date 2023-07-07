const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  added: { type: Date, required: true },
  user: {
    type: String, required: true, minLength: 1, maxLength: 20,
  },
  text: {
    type: String, required: true, minLength: 1, maxLength: 300,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
