var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var uniqid = require('uniqid');
var Mongo = require('../bin/mongo');
var crypto = require('crypto');

/* GET my session. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  res.json ({
    status: true,
    datas : {
      email : '',
      nom : 'Machin'
    }
  })
});


//Login
/* Log in */
router.put('/', function (req, res, next) {

  Mongo.getInstance()
    .collection('users')
    .findOne({
      email: req.body.email
    },
      function (err, response) {
        if (err) {
          return res.json({
            status: false,
            message: err.message
          });
        } else {
          if (!response || !response._id ||
            crypto.createHash('sha256').update(req.body.password + response.salt).digest('hex') !== response.password) {
            return res.json({
              status: false,
              message: 'Merci de vérifier vos identifiants',
            })
          }
          req.session.user = response

          return res.json({
            status: true
          });
        }
      });
});


/* Sign in */
router.post('/', function (req, res, next) {

  var errors = [];

  if (!req.body.email || !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(req.body.email)) {
    errors.push('Email');
  }

  if (!req.body.password || !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(req.body.password)) {
    errors.push('Mot de passe');
  }

  if (!req.body.password2 || req.body.password !== req.body.password2) {
    errors.push('Confirmation du mot de passe');
  }

  if (errors.length) {
    return res.json({
      status: false,
      msg: 'Merci de vérifier les champs suivants: ' + errors.join(', ')
    })
  }

  let salt = uniqid();
  let password = crypto.createHash('sha256').update(req.body.password + salt).digest('hex');

  let datas = {
    email: req.body.email,
    password: password,
    salt: salt,
  }


  Mongo.getInstance()
  .colection('users')
  .insertOne(req.body,
    function(err, result){
      console.log(result)
    })
  res.json({
    status: true,
  })
});

//Deconnexion
router.delete('/', function(req, res, next){
  console.log(req.session)
  //email/password
  //=> find BDD
  req.session.destroy();
  res.json({
    status: true,
  });
})

router.use(function(req, res, next){
  if(!req.session.user){
    return next(createError(403))
  }
})
module.exports = router;
