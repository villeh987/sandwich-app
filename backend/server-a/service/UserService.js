'use strict';
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * Create user
 * This can only be done by the logged in user.
 *
 * body User Created user object
 * no response value expected for this operation
 **/
exports.createUser = function (body) {

  console.log("------------------UserService-------------------");
  console.log(body);
  console.log("------------------UserService-------------------");
  return new Promise(function (resolve, reject) {
    console.log("//////////////////////RESOLVE/////////////////////////");
    var status = {};
    const userData = {
      username: body.data.username,
      email: body.data.email,
      password: body.data.password
    }

    User.findOne({
      username: body.data.username
    })
      .then(user => {
        if (!user) {
          bcrypt.hash(body.data.password, 10, (err, hash) => {
            userData.password = hash
            User.create(userData)
              .then(user => {
                //res.json({ status: 'Registered!' })
                console.log('Registered');
                console.log(test);
                test = 2
                console.log(test);
                status['application/json'] = {
                  "status": 200
                };
                console.log(status);
              })
              .catch(err => {
                //res.json({ error: 'User already exists' })
                console.log('User already exists');
                status['application/json'] = {
                  "status": 409
                };
              })
          })
        } else {
          //res.json({ error: 'User already exists' })
          console.log('User already exists');
          status['application/json'] = {
            "status": 409
          };
        }
      })
      .catch(err => {
        //res.send('error: ' + err)
        console.log('Error');
        status['application/json'] = {
          "status": 404
        };
      })
    console.log(status);
    // Palauttaa JSONSTRINGIFY (jossa pelkkä koodi joka määritelty ylempänä)
    resolve(status);
  });
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function (username) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Get user by user name
 *
 * username String The name that needs to be fetched. Use user1 for testing.
 * returns User
 **/
exports.getUserByName = function (username) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "password": "password",
      "id": 0,
      "email": "email",
      "username": "username"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs user into the system
 *
 * user User The user for login
 * returns String
 **/
exports.loginUser = function (user) {
  return new Promise(function (resolve, reject) {
    console.log(user);
    User.findOne({
      username: user.data.username
    })
      .then(user_db => {
        if (user_db) {
          if (bcrypt.compareSync(user.data.password, user_db.password)) {
            // Passwords match
            const payload = {
              _id: user._id,
              username: user.username
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              // expiresIn: '24h' //1440
            })

            //resolve.send(token)
          } else {
            // Passwords don't match
            //resolve.json({ error: 'Wrong password' })
            console.log('wrong password');
          }
        } else {
          //resolve.json({ error: 'User does not exist' })
          console.log('user does not exist');
        }
      })
      .catch(err => {
        //resolve.send('error: ' + err)
      })

    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs out current logged in user session
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function () {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * username String name that need to be updated
 * body User Updated user object
 * no response value expected for this operation
 **/
exports.updateUser = function (username, body) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}

