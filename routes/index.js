const express = require('express');
const mongoose = require('mongoose');
const Message = require('../models/message');
require('dotenv').config();

const router = express.Router();

async function getMessages() {
  // mongodb atlas connection with mongoose
  mongoose.set('strictQuery', false);
  const mongoDB = process.env.ATLAS;
  await mongoose.connect(mongoDB);
  return [...await Message.find({}).sort({ added: 1 })];
}

router.get('/', async (req, res) => {
  let messages;
  let error;
  try {
    messages = await getMessages();
  } catch (err) {
    error = err;
  }
  res.render('index', { messages, error, title: 'Mini Messageboard' });
});

router.get('/new', (req, res) => {
  res.render('form');
});

router.post('/new', (req, res) => {
  messages.push({
    added: new Date().toLocaleString(),
    text: req.body.message,
    user: req.body.user,
  });
  res.redirect('/');
});

module.exports = router;
