const schema = require('./user.schema');

const userValidation = user => schema.validate({ ...user });

module.exports = userValidation;