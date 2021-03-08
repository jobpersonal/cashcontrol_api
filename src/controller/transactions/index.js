const { storeIncomeController } = require('./transaction.controller');
const { getAllTransactionsController } = require('./transaction.controller');
const { storeDebtController } = require('./transaction.controller');
const { storeExpenseController } = require('./transaction.controller');
const { getAllIncomeController } = require('./transaction.controller');
const { getAllExpenseController } = require('./transaction.controller');
const { getAllDebtController } = require('./transaction.controller');


exports.storeIncome = storeIncomeController;
exports.getAllTransactions = getAllTransactionsController
exports.storeDebt = storeDebtController
exports.storeExpense = storeExpenseController;
exports.getAllIncome = getAllIncomeController;
exports.getAllExpense = getAllExpenseController;
exports.getAllDebt = getAllDebtController;