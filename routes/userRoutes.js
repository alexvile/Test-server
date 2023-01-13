const express = require('express');
const router = express.Router();

const { asyncWrapper } = require('../helpers/apiHelpers')
const { registerController, loginController } = require('../controllers/userControllers');


router.post('/register', asyncWrapper(registerController));
router.post('/login', asyncWrapper(loginController))

module.exports = router