const express = require('express')
const router = express.Router()


//GET to dashboard
router.get('/add',(req,res)=>{
    res.render('notes/add');
})

router.post('/',(req,res)=>{
    console.log(req.body);
    res.send('recieved!')
})

module.exports = router
  