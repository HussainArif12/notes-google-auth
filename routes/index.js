const express=  require('express');
const {ensureAuth,ensureGuest} = require('../middleware/auth')
const router = express.Router();

router.get('/',ensureGuest,(req,res)=>{
    res.render('login',
    {
        layout: 'login'
    });
})

router.get('/dashboard',ensureAuth,(req,res)=>{
    res.render('dashboard')
})

module.exports = router;