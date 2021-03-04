if (!process.env.ISPROD) require('dotenv').config();
const { incomeValidate } = require('./../../validations/transactions');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


const storeIncomeController = async (req, res) => {
  const { concept, periodicity, finish_at, income_type, amount } = req.body;
  const { error } = incomeValidate({
    concept,
    periodicity,
    finish_at,
    income_type,
    amount
  });

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    try {
      const now = new Date();
      const date_range = finish_at.split('-');
      const finish = new Date(Date.UTC(date_range[2], date_range[0] - 1, date_range[1] + 1, 0, 0, 0));
      const user = await prisma.user.findFirst({
        where: {
          phone: req.user.phone
        }
      });

      const income = await prisma.income.create({
        data: {
          concept,
          periodicity,
          finish_at: finish,
          created_at: now,
          income_type,
          amount
        }
      });

      const transaction = await prisma.transaction.create({
        data: {
          income_id: income.id,
          user_id: user.id,
        }
      });
      res.status(201).json({ succes: true, data: transaction })
    } catch (err) {
      console.error(err);
      res.status(501).json({ error: 'Prisma exception.'});
    }
  }
};

const getAllTransactionsController = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        user: {
          phone: req.user.phone
        }
      },
      include: {
        user: {},
        income: {},
        expense: {},
        debt: {}
      }
    });
    res.json({ success: true, data: transactions })
  } catch (err) {
    console.error(err);
    res.status(501).json({ error: err });
  }
};

exports.storeIncomeController = storeIncomeController;
exports.getAllTransactionsController = getAllTransactionsController;