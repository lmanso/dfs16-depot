var express = require('express');
var router = express.Router();

/* GET home page. Lister les differents flipbook */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Mon Webserver', book: [] });
});


/* Retourner en json les donnees liee a un flipbook dont l id et dans l'url. */
router.get('/:id', function(req, res, next) {
  if(req.params.id !== 'azerty'){
    return next();
  }
  console.log(req.params.id),
  res.json({
    title:'on flipbook', 
    page: [{content: 'contenu de la page 1'}], 
    description: 'description', 
    publisher: 'TomNook', 
    publishDate: '2020/03/01',
  });
  // res.render('index', { title: 'Mon Webserver' });
});

module.exports = router;
