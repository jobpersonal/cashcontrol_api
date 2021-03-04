const schema = require('./income.schema');

const incomeValidation = income => schema.validate({ ...income });

module.exports = incomeValidation;