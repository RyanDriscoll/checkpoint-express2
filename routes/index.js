var express = require('express');
var router = express.Router();
const app = express();

var Article = require('../models/article');

/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 *
 */

router.get('/articles', function(req, res, next) {
  Article.findAll()
  .then(function(articles) {
    res.json(articles);
  })
  .catch(next);
});

router.get('/articles/:id', function(req, res, next) {
  Article.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function(foundArticle) {
    res.json(foundArticle);
  })
  .catch(next);
});




router.post('/articles', function(req, res, next) {
  Article.create({
    title: req.body.title,
    content: req.body.content
  })
  .then(function(createdArticle) {
    let obj = {
      message: 'Created successfully',
      article: {
        id: createdArticle.dataValues.id,
        title: createdArticle.dataValues.title,
        content: createdArticle.dataValues.content
      }
    };
    return obj;
  })
  .then(function(obj) {
    res.json(obj);
  })
  .catch(next);
});





router.put('/articles/:id', function(req, res, next) {
  Article.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function(foundArticle) {
    let newObj = {
      message: 'Updated successfully',
      article: {
        id: foundArticle.dataValues.id,
        title: req.body.title,
        content: foundArticle.dataValues.content
      }
    }
    foundArticle.update(newObj)
    .then(function(updatedArticle) {
      res.json(updatedArticle);
    });
  })
  .catch(next);
});

router.use(function(err, req, res, next) {
  res.status(err.status).send(err.message);
});


module.exports = router;
