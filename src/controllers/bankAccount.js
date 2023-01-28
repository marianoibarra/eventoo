const { BankAccount } = require("../db");


const createBankAccount = async (req, res) => {
  try {
    const { name, CBU } = req.body;
    const userId  = req.userId

    const bankAccountFromDB = await BankAccount.create({ name, CBU, userId }).catch((e) => {
      return res.status(500).json({
        error: {
          message: "Error while creating resource",
          values: { ...req.body },
        },
      });
    });
    await bankAccountFromDB.setUser(userId);
    return res.status(200).json({ bankAccount: bankAccountFromDB });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const getBankAccount = async (req, res) => {
  try {
    const bankAccounts = await BankAccount.findAll({
      where: { UserId: req.userId },
    });
    return res.status(200).json({ bankAccounts });
  } catch (err) {
    return res.status(500).json({ error: "Error while retrieving bank accounts" });
  }
};


const modifyBankAccount = async (req, res) => {
  try {
    const { name, CBU } = req.body;
    const bankAccount = await BankAccount.findOne({
      where: { id: req.params.id, UserId: req.userId }
    });
    if (!bankAccount) {
      return res.status(404).json({ error: "Cuenta bancaria no encontrada" });
    }
    BankAccount.name = name;
    BankAccount.CBU = CBU;
    await BankAccount.save();
    return res.status(200).json({ BankAccount });
  } catch (err) {
    return res.status(500).json({ error: "Error al actualizar la cuenta bancaria" });
  }
};



const deleteBankAccount = async (req, res) => {
  try {
    const userId  = req.userId
    const BankAccount = await BankAccount.findOne({
      where: { id: req.params.id, UserId: userId }
    });
    if (!BankAccount) {
      return res.status(404).json({ error: "Cuenta bancaria no encontrada" });
    }
    await BankAccount.destroy();
    return res.status(200).json({ message: "Cuenta bancaria eliminada exitosamente" });
  } catch (err) {
    return res.status(500).json({ error: "Error al eliminar la cuenta bancaria" });
  }
};


module.exports = { 
  createBankAccount,
  modifyBankAccount,
  deleteBankAccount,
  getBankAccount,
};
