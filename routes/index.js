const express = require('express');

const router = express.Router();

const messages = [
  {
    added: new Date().toLocaleString(),
    text: 'Hi everyone!',
    user: 'Guy McDude',
  },
  {
    added: new Date().toLocaleString(),
    text: 'I like pizza',
    user: 'PIZZAFAN',
  },
  {
    added: new Date().toLocaleString(),
    text: 'pizza sucks',
    user: 'nopizza',
  },
];

router.get('/', (req, res) => {
  res.render('index', { messages, title: 'Mini Messageboard' });
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
