const express = require('express');
const router = express.Router();

const { asyncWrapper } = require('../helpers/apiHelpers');
const { registerController, loginController, logoutController, getCurrentController } = require('../controllers/userControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');


router.post('/register', asyncWrapper(registerController));
router.post('/login', asyncWrapper(loginController));
router.get('/current', authMiddleware, asyncWrapper(getCurrentController));
router.get('/logout', authMiddleware, asyncWrapper(logoutController));

module.exports = router