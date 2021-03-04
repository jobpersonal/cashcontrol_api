if (!process.env.ISPROD) require('dotenv').config();
const router = require('express').Router();
const userController = require('./../controller/user');
const { apiMiddleware } = require('./../middleware/api');

router.use('/api', apiMiddleware);

router.post('/jwt/token', userController.refreshToken);
router.post('/jwt/signin', userController.signIn);
router.post('/signup', userController.signUp);

module.exports = router;