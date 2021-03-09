const { signUpController } = require('./user.controller');
const { signInController } = require('./user.controller');
const { refreshTokenController } = require('./user.controller');
const { updateUserController } = require('./user.controller');

exports.signUp = signUpController;
exports.signIn = signInController;
exports.refreshToken = refreshTokenController;
exports.updateUser = updateUserController;