'use strict';

const { users } = require('../auth/models/index');

async function handleSignup(req, res, next) {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await users.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send(
    'Welcome to the secret area!');
}

// function handleCreateMsg(req, res, next) {
//   res.status(200).send('OK! I have read permissions');
// }

// function handleGetAllMsg(req, res, next) {
//   res.status(200).send('OK! I have create permissions');
// }

// function handleUpdateMsg(req, res, next) {
//   res.status(200).send('OK! I have update permissions');
// }

// function handleDeleteMsg(req, res, next) {
//   res.status(200).send('OK! I have delete permissions');
// }




module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret,
  // handleUpdateMsg,
  // handleDeleteMsg,
  // handleCreateMsg,
  // handleGetAllMsg
};
