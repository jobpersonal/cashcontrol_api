if (!process.env.ISPROD) require('dotenv').config();
const jwt = require('jsonwebtoken');
const { userValidate } = require('./../../validations/user');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const refreshTokens = [];

const signUpController = async (req, res) => {
	const { name, lastname, password, phone, email } = req.body;
	const { error } = userValidate({ name, lastname, password, phone, email });

	if (error) {
		res.status(400).json({ error: error.details[0].message });
	} else {
		const now = new Date();
		
		bcrypt.genSalt(10, function async (err, salt) {
      bcrypt.hash(password, salt, function async (err, hash) {
        if (err) {
          res.status(501).json({ error: err });
        } else {
          try {
            const user = await prisma.user.create({ 
              data: {
                name,
                lastname,
                phone,
                password: hash,
                created_at: now,
                email
              }
            });
            res.status(201).json({ succes: true, data: user })
          } catch (err) {
            res.status(501).json({ error: err });
          }
        }
      })
		});
	}
}

const signInController = async (req, res) => {
    const { phone, password } = req.body;
    if (!phone && !password) res.status(401).json({ error: 'El telefono o la contraseña son incorrectas' });
    else {
      try {
        const user = await prisma.user.findFirst({ where: { phone } });
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) res.status(400).json({ error: err });
          if (!result) res.status(401).json({ error: 'El telefono o la contraseña son incorrectas' });
          const data = {
            phone, password
          };
          const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
          const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
          refreshTokens.push(refreshToken);
          res.json({ token: accessToken, refresh_token: refreshToken });
        });
      } catch (err) {
        res.status(501).json({ error: err });
      }
    }
};

const refreshTokenController = (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) res.sendStatus(403);

    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
    res.json({ token });
  });
}

exports.signInController = signInController;
exports.signUpController = signUpController;
exports.refreshTokenController = refreshTokenController;