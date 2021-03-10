const joi = require('joi');

const schema = joi.object({
  concept: joi.string().min(3).max(50).regex(/^[a-zA-Z]{3,}$/).message('El concepto es requerido.').required(), 
  capital: joi.number().min(2000.0).max(50000.0).message('El capital es requerido y debe estar entre 2.000 y 50.000.000.').required(), 
  monthly_percentage: joi.number().min(0.01).max(0.99).message('El porcentage de participacion mensual es requerido y debe de estar entre 0.01 y 0.99').required()
});

module.exports = schema;