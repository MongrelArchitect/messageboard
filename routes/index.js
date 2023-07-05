const express = require('express');

const router = express.Router();

const messages = [
  {
    added: new Date(),
    text: 'hi everyone',
    user: 'some guy',
  },
  {
    added: new Date(),
    text: 'i like pizza',
    user: 'PIZZAMAN',
  },
  {
    added: new Date(),
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
    added: new Date(),
    text: req.body.message,
    user: req.body.user,
  });
  res.redirect('/');
});

module.exports = router;
