const { Category, User, Address, RoleAdmin } = require("../db");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Address,
          as: "address",
          attributes: { exclude: ["id"] },
        },
        {
          model: RoleAdmin,
        },
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const changeBan = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    await user.update({
      isBanned: !user.isBanned,
    });
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  const { id } = req.params;
  const { name, modality, image } = req.body;
  try {
    const category = await Category.findByPk(id);
    await category.update({
      name,
      modality,
      image,
    });
    res.json(category);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const changeRole = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    const roleId = user.roleAdminId;
    let role = await RoleAdmin.findByPk(roleId);
    role.name =
      role.name === "ADMIN" ? (role.name = "USER") : (role.name = "ADMIN");
    await role.update({ name: role.name });
    res.send("Successful update");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  changeBan,
  getCategories,
  changeRole,
};
