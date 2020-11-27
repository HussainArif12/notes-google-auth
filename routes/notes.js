const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();
const Note = require('../models/Note');

//GET to dashboard
router.get('/add', ensureAuth, (req, res) => {
  res.render('notes/add');
});

router.post('/add', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user._id;
    console.log(req.body);
    const note = await Note.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).lean();
    console.log(note);
    res.render('notes/read', { note });
  } catch (err) {
    console.log(err);
  }
});
router.get('/edit/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit', { note });
  } catch (err) {
    console.log(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    console.log(req.body);
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body },
    );
    res.redirect('/dashboard');
  } catch (er) {
    console.log(er);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id });
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
