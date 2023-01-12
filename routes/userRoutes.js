const express = require('express');
const router = express.Router();

const { asyncWrapper } = require('../helpers/apiHelpers')
const { registerController } = require('../controllers/userControllers');


router.post('/register', asyncWrapper(registerController))

module.exports = router