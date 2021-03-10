const { 
  createInvestmentController, 
  getAllInvestmentController } = require('./investments.controller');

exports.createInvestment = createInvestmentController;
exports.getAllInvestment = getAllInvestmentController;