const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router()
const Note = require('../models/Note');

//GET to dashboard
router.get('/add',ensureAuth,(req,res)=>{
    res.render('notes/add');
})

router.post('/add',ensureAuth,async (req,res)=>{
   try {
    req.body.user = req.user._id;
    console.log(req.body);
    const note = await Note.create(req.body);
    res.redirect('/dashboard');
   }catch(err){
       console.log(err);
   }
})

router.delete('/delete/:id',async(req,res)=>{
   try {
    await Note.deleteOne({_id : req.params.id});
    res.redirect('/dashboard');    
   }catch(err){
       console.log(err);
   }
})
module.exports = router
  