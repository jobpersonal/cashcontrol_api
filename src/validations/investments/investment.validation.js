const schema = require('./investment.schema');

const investmentValidation = investment => schema.validate({ ...investment });

module.exports = investmentValidation;