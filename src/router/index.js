if (!process.env.ISPROD) require('dotenv').config();
const router = require('express').Router();
const userController = require('./../controller/user');
const transactionController = require('./../controller/transactions');
const { apiMiddleware } = require('./../middleware/api');

router.use('/api', apiMiddleware);

router.post('/jwt/token', userController.refreshToken);
router.post('/jwt/signin', userController.signIn);
router.post('/signup', userController.signUp);

router.post('/api/income', transactionController.storeIncome);
router.get('/api/transactions', transactionController.getAllTransactions);
router.post('/api/expense', transactionController.storeExpense);
router.post('/api/debt', transactionController.storeDebt);
router.get('/api/income', transactionController.getAllIncome);
router.get('/api/debt', transactionController.getAllDebt);
router.get('/api/expense', transactionController.getAllExpense);

module.exports = router;