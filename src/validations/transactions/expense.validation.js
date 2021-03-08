const schema = require('./expense.schema');

const expenseValidation = expense => schema.validate({ ...expense });

module.exports = expenseValidation;