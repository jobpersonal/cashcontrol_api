if (!process.env.ISPROD) require('dotenv').config();
const jwt = require('jsonwebtoken');
const { userValidate } = require('./../../validations/user');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');

const refreshTokens = [];

const signUpController = async (req, res) => {
	const { name, lastname, password, phone, email } = req.body;
	const { error } = userValidate({ name, lastname, password, phone, email });

	if (error) {
		res.status(400).json({ error: error.details[0].message });
	} else {
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          res.status(501).json({ error: err });
        } else {
          try {
            const now = new Date();
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
            res.status(201).json({ success: true, data: user })
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
          res.status(200).json({ token: accessToken, refresh_token: refreshToken, data: user });
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

const updateUserController = async (req, res) => {
  const { name, lastname, phone, newPhone, email } = req.body;
  const { error } = userValidate({ name, lastname, password: 'c123$Ab-+', phone, email });

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    try {
      const user = await prisma.user.update({
        where: { phone },
        data: {
          name,
          lastname,
          phone: newPhone || phone,
          email
        }
      });
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      console.error('Error ' + new Date(), err);
      res.status(501).json({ error: 'Prisma error.' });
    }
  }
};

exports.signInController = signInController;
exports.signUpController = signUpController;
exports.refreshTokenController = refreshTokenController;
exports.updateUserController = updateUserController;