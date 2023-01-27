const { Bank_Account,  } = require("../db");
const jwt = require('jsonwebtoken')




const createBank_Account = async (req, res) => {
  try {
    const { name, CBU } = req.body;
    const userId  = req.userId
    const bank_Account = await Bank_Account.create({ name, CBU, userId }).catch((e) => {
      return res.status(500).json({
        error: {
          message: "Error while creating resource",
          values: { ...req.body },
        },
      });
    });
    await bank_Account.setUser(userId);
    return res.status(200).json({ bank_Account });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const getBank_Account = async (req, res) => {
  try {
    const bankAccounts = await Bank_Account.findAll({
      where: { UserId: req.userId },
    });
    return res.status(200).json({ bankAccounts });
  } catch (err) {
    return res.status(500).json({ error: "Error while retrieving bank accounts" });
  }
};


const modifyBank_Account = async (req, res) => {
  try {
    const { name, CBU } = req.body;
    const bank_Account = await Bank_Account.findOne({
      where: { id: req.params.id, UserId: req.userId }
    });
    if (!bank_Account) {
      return res.status(404).json({ error: "Cuenta bancaria no encontrada" });
    }
    bank_Account.name = name;
    bank_Account.CBU = CBU;
    await bank_Account.save();
    return res.status(200).json({ bank_Account });
  } catch (err) {
    return res.status(500).json({ error: "Error al actualizar la cuenta bancaria" });
  }
};



const deleteBank_Account = async (req, res) => {
  try {
    const userId  = req.userId
    const bank_Account = await Bank_Account.findOne({
      where: { id: req.params.id, UserId: userId }
    });
    if (!bank_Account) {
      return res.status(404).json({ error: "Cuenta bancaria no encontrada" });
    }
    await bank_Account.destroy();
    return res.status(200).json({ message: "Cuenta bancaria eliminada exitosamente" });
  } catch (err) {
    return res.status(500).json({ error: "Error al eliminar la cuenta bancaria" });
  }
};


module.exports = { 
  createBank_Account,
  modifyBank_Account,
  deleteBank_Account,
  getBank_Account,
};
