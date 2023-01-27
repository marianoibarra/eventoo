const { Bank_Account,  } = require("../db");
const jwt = require('jsonwebtoken')


const createBank_Account = async (req, res) => {
  const { id } = req.userId
  try {
    const { name, cbu } = req.body;
    const bank_Account = await Bank_Account.create({ name, cbu, userId: req.userId });

    res.status(201).json({ message: 'Bank account created successfully', bank_Account });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


const modifyBank_Account = async (req, res) => {
  const { name, cbu } = req.body;
  try {
    res.status(201).json({ message: 'Bank account modifyBank_Account successfully', cbu, name });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};



const deleteBank_Account = async (req, res) => {
  const { name, cbu } = req.body;
  try {
    res.status(201).json({ message: 'Bank account deleteBank_Account successfully', cbu, name });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const getBank_Account = async (req, res) => {
  const { id } = req.userId
  try {
    const bankAccount = await Bank_Account.findByPk(id);
    if (!bankAccount) {
      return res.status(404).json({ message: 'Bank account not found' });
    }
    res.status(200).json(bankAccount);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bank account' });
  }
};


module.exports = { 
  createBank_Account,
  modifyBank_Account,
  deleteBank_Account,
  getBank_Account,
};
