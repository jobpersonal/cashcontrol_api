const schema = require('./debt.schema');

const debtValidation = debt => schema.validate({ ...debt });

module.exports = debtValidation;