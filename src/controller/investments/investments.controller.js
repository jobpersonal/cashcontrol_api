if (!process.env.ISPROD) require('dotenv').config();
const { investmentValidate } = require('./../../validations/investments');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const createInvestmentController = async (req, res) => {
  const { concept, capital, monthly_percentage } = req.body;
  const { error } = investmentValidate({ concept, capital, monthly_percentage });

  if (error) {
    res.status(400).json({ error });
  } else {
    try {
      const now = new Date();
      const investment = await prisma.investments.create({
        concept,
        capital,
        monthly_percentage,
        created_at: now
      });
      res.status(201).json({ success: true, data: investment });
    } catch (err) {
      console.error('Error ' + new Date(), err);
      res.status(501).json({ error: 'Prisma error.'});
    }
  }
};

const getAllInvestmentController = async (req, res) => {
  try {
    const investments = await prisma.investments.findMany({
      where: {
        user: {
          phone: req.user.phone
        }
      }
    });

    res.json({ success: true, data: investments });
  } catch (err) {
    console.error('Error ' + new Date(), err);
    res.status(501).json({ error: 'Prisma error.' });
  }
};

exports.createInvestmentController = createInvestmentController;
exports.getAllInvestmentController = getAllInvestmentController;