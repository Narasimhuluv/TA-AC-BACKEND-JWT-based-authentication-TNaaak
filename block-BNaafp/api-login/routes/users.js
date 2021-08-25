var express = require('express');
var router = express.Router();
var User = require('../models/User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async(req,res,next) => {
  try {
    var user = await User.create(req.body);
    console.log(user)
    res.status(201).json({user})
  } catch (error) {
    next(error)
  }
})

 router.post('/login', async (req,res,next) => {
   var {name , password} = req.body;
   if(!name || !password) {
     return res.status(400).json({error : "Email/password required"})
   }
  try {
    var user = await User.findOne({name})
    if(!user){
      return res.status(400).json({error : "name is not Valid"})
    }
  } catch (error) {
    next(error)
  }

    result = await user.verifyPassword(password)
    console.log(user,result)
    if(!result){
      return res.status(400).json({error : "Password Is Invalid"})
    }

    // Generate Tokens

 })

module.exports = router;
