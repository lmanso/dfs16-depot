var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var uniqid = require('uniqid');
 

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(true || req.session.user) {
  // if(req.session.user) {
    return next();
  }
  res.render('admin/index', {title: 'FlipBook'});
});

router.use(function(req, res, next) {    
  //  if (false && !req.session) {        
    if (!req.session) {    
      return next(createError(403));
    }     
  return next() 
}) 

router.get('/', function(req, res, next) {
  res.render('admin/dashboard', {title: 'FlipBook'});
}); 

//CREA FLIPBOOK

/* create flipBook */
router.post('/', function (req, res, next) {
  var errors = [];
  console.log(req.body.pdfFile);

  if (req.body.pdfFile) {
    var reader = new FileReader();
    reader.readAsText(req.body.pdfFile, "UTF-8");
    reader.onload = function (evt) {
      alerte(evt.target.result);
    }
    reader.onerror = function (evt) {
      alerte("error reading file");
    }
  }

  if (!req.body.title || !/^([\w\s]{6,})$/.test(req.body.title)) {
    errors.push('Titre');
  }

  if (!req.body.pdfFile) {
    errors.push('Fichier PDF');
  }

  if (errors.length) {
    return res.json({
      status: false,
      msg: 'Merci de vérifier les champs suivants: ' + errors.join(', ')
    })
  }

  let datas = {
    title: req.body.title,
    pdfInformations: {
    }
  }

  Mongo.getInstance()
    .collection('flipBooks')
    .insertOne(datas,
      function (err, result) {
        if (err) {
          if (err.message.indexOf('duplicate key') !== -1) {
            return res.json({
              status: false,
              message: 'Un flipbook avec le même titre a déjà été importé'
            });
          } else {
            return res.json({
              status: true,
            })
          }
        }
      })

});

/* get flipBook infos */
router.get('/:id', function (req, res, next) {
  res.json({ status: true });
});

/* edit flipBook */
router.put('/:id', function (req, res, next) {
  res.json({ status: true });
});

/* edit flipBook */
router.delete('/:id', function (req, res, next) {
  res.json({ status: true });
});




module.exports = router;

router.post