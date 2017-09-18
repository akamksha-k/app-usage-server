const express = require('express');
const router = express.Router();
const models = require('../models');
const User = models.User;
const UserRole = models.UserRole;
/* To fill and Send response object. */
function SendResponse(res, Code, Message, responseData) {
  res.statusCode = Code;
  res.statusMessage = Message;

  if (responseData != undefined) {
    return res.send(responseData);
  } else {
    return res.send({});
  }
}

function SendUserResponse(res, responseData) {
  res.statusCode = responseData.statusCode;
  return res.status(responseData.statusCode).send(responseData);
}

/* To Authenticate username and password. */
router.post('/authenticate', (req, res, next) => {
  /* To Check of username or password empty. */
  var rolesKey = [];
  if (req.body.username == undefined || req.body.password == undefined) {
    var model = {
      firstname: null,
      lastname: null,
      statusCode: 400,
      statusMessage: 'Please provide username and password',
    };
    SendResponse(res, 400, 'Please provide username and password', model);
    return next();
  }
  /* To Query username and password. */

  User.find({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
    include: [
      {
        model: models.Role,
      },
    ],
  }).then(function(user) {
    if (!user) {
      var model = {
        firstname: null,
        lastname: null,
        statusCode: 401,
        statusMessage: 'Unauthorized user',
      };
      SendResponse(res, 401, 'Unauthorized user', model);
    } else {
      user.Roles.forEach(function(element) {
        rolesKey.push(element.key);
      }, this);
      var model = {
        firstname: user.firstname,
        lastname: user.lastname,
        userID: user.id,
        role: rolesKey,
        statusCode: 200,
        statusMessage: 'User Authenticated succesfully!!',
      };
      SendResponse(res, 200, 'User Authenticated succesfully!!', model);
    }
  });
});

// Api to fetch list of users.

router.get('/getAllUsers', (req, res, next) => {
  let listOfUsers = new Array();
  User.findAll({
    attributes: ['id', 'username', 'firstname', 'lastname'],
  }).then(Users => {
    let responseBody = {};
    if (Users != null && Users.length > 0) {
      responseBody = {
        statusCode: 200,
        statusMessage: Users.length + ' Users found',
        users: Users,
      };
    } else {
      responseBody = {
        statusCode: 404,
        statusMessage: `No users found`,
      };
    }
    SendUserResponse(res, responseBody);
  });
});

module.exports = router;
