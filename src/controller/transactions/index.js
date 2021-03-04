const { storeIncomeController } = require('./transaction.controller');
const { getAllTransactionsController } = require('./transaction.controller');


exports.storeIncome = storeIncomeController;
exports.getAllTransactions = getAllTransactionsController