const express = require('express');
const router = express.Router();
const models = require('../models');
const User = models.User;

/* GET home page. */
router.get('/', (req, res, next) => {
  User.count().then(count => {
    res.send({ title: 'Digital Clinical API Server', userCount: count });
  });
});

module.exports = router;
