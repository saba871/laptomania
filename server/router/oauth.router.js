const express = require('express');
const {
  googleCallBack,
  getGoogleAuthUrl,
} = require('../controller/oauth.controller');

const oauthRouter = express.Router();

oauthRouter.get('/google', getGoogleAuthUrl);
oauthRouter.get('/google/callback', googleCallBack);

module.exports = {
  oauthRouter,
};
