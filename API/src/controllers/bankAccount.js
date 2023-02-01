const { BankAccount } = require("../db");


const createBankAccount = async (req, res) => {
    try {
      const { name, CBU } = req.body;
      const userId  = req.userId

      if (!name || !CBU) {
        return res
          .status(400)
          .json({ error: "The name and the CBU are mandatory fields" });
      }

      if (!/^\d{22}$/.test(CBU)) {
        return res.status(400).json({ error: "CBU must have 22 numeric digits" });
      }
      
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
      return res.status(401).json({ error: "Failed to create a new bank account" });
    }
  };

const getBankAccount = async (req, res) => {
  try {
    const bankAccounts = await BankAccount.findAll({
      where: { UserId: req.userId },
    });
    return res.status(200).json({ bankAccounts });
  } catch (error) {
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
      return res.status(404).json({ error: "bank account not found" });
    }
    BankAccount.name = name;
    BankAccount.CBU = CBU;
    await BankAccount.save();
    return res.status(200).json({ BankAccount });
  } catch (err) {
    return res.status(500).json({ error: "Error updating bank account" });
  }
};



const deleteBankAccount = async (req, res) => {
  try {
    const userId  = req.userId
    const BankAccount = await BankAccount.findOne({
      where: { id: req.params.id, UserId: userId }
    });
    if (!BankAccount) {
      return res.status(404).json({ error: "bank account not found" });
    }
    await BankAccount.destroy();
    return res.status(200).json({ message: "Bank account successfully removed" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting bank account"});
  }
};


module.exports = { 
  createBankAccount,
  modifyBankAccount,
  deleteBankAccount,
  getBankAccount,
};
