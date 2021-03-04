const joi = require('joi');

const schema = joi.object({
    name: joi.string().min(3).max(50).regex(/^[a-zA-Z]{3,}$/).message('El nombre no puede tener caracteres especiales y debe tener al menos 3 letras').required(),
    lastname: joi.string().min(3).max(50).regex(/^[a-zA-Z]{3,}$/).message('El apellido no puede tener caracteres especiales y debe tener al menos 3 letras').required(),
    password: joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).message('La contraseña debe contener minimo 8 caracteres, al menos un numero y al menos y un caracter especial').required(),
    phone: joi.string().regex(/^3\d{9}$/).message('El telefono debe de tener 10 digitos y tener esta estructura 3xx xxx xxxx').required(),
    email: joi.string().email().message('El correo debe de tener esta estructura user@example.co').required()
});

module.exports = schema;