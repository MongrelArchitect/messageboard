const express = require('express');
const Message = require('../models/message');

const router = express.Router();

async function getMessages() {
  return [...await Message.find({}).sort({ added: 1 })];
}

async function postNewMessage(text, user) {
  const message = new Message({
    added: new Date(),
    text,
    user,
  });
}

router.get('/', async (req, res) => {
  let messages;
  let error;
  try {
    messages = await getMessages();
  } catch (err) {
    // pug template will check for this error / lack of messages
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
