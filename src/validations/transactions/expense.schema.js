const joi = require('joi');


const schema = joi.object({
  concept: joi.string().min(5).max(50).message('El concepto debe tener entre 5 y 50 caracteres').required(),
  amount: joi.number().min(2000).message('El valor debe estart entre 2.000 y 5.000.000').max(5000000).message('El valor debe estart entre 2.000 y 5.000.000').required()
});

module.exports = schema;