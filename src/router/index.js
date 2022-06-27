'use strict';

const { response } = require('express');
const express = require('express');
const authRouter = express.Router();

const acl = require('../auth/middleware/acl');
const basicAuth = require('../auth/middleware/basic');
const bearerAuth = require('../auth/middleware/bearer.js');
const { userBoardModel ,userStatusModel } = require('../auth/models');
const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleSecret,
  // handleCreateMsg,
  // handleDeleteMsg,
  // handleGetAllMsg,
  // handleUpdateMsg,
} = require('../router/handler');

authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignin);
authRouter.get('/users', bearerAuth, handleGetUsers);
authRouter.get('/secret', bearerAuth, handleSecret);

authRouter.get('/msgBoard', bearerAuth, acl('read'), async (req, res, next) => {
  let response = await userBoardModel.findAll();
  res.status(200).send(response);
});

authRouter.post('/msgBoard', bearerAuth, acl('create'), async (req, res, next) => {
  let userMsg = req.body;

  let response = await userBoardModel.create(userMsg);
  res.status(200).send(response);
});

authRouter.put('/msgBoard/:id', bearerAuth, acl('update'), async(req, res, next) => {
  let { id } = req.params;

  await userBoardModel.update(req.body, {where: {id}});
  let updatedMsmg = await userBoardModel.findOne({where: {id}});

  res.status(200).send(updatedMsmg);
});

authRouter.delete('/msgBoard/:id', bearerAuth, acl('delete'), async(req, res, next) => {
  let { id } = req.params;

  let deletedMessage = await userBoardModel.findOne({where: {id}});

  await userBoardModel.destroy({where: {id}});

  res.status(200).send(deletedMessage);
});


// BEGINING OF STATUS ROUTES


authRouter.get('/status', bearerAuth, acl('read'), async (req, res, next) => {
  let response = await userStatusModel.findAll();
  res.status(200).send(response);
});

authRouter.post('/status', bearerAuth, acl('create'), async (req, res, next) => {
  let userStatus = req.body;

  let response = await userStatusModel.create(userStatus);
  res.status(200).send(response);
});

authRouter.put('/status/:id', bearerAuth, acl('update'), async(req, res, next) => {
  let { id } = req.params;

  await userStatusModel.update(req.body, {where: {id}});
  let updatedStatus = await userStatusModel.findOne({where: {id}});

  res.status(200).send(updatedStatus);
});

authRouter.delete('/status/:id', bearerAuth, acl('delete'), async(req, res, next) => {
  let { id } = req.params;

  let deletedStatus = await userStatusModel.findOne({where: {id}});

  await userStatusModel.destroy({where: {id}});

  res.status(200).send(deletedStatus);
});


module.exports = authRouter;