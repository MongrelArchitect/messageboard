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
  await message.save();
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

router.post('/new', async (req, res) => {
  try {
    await postNewMessage(req.body.message, req.body.user);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

module.exports = router;
