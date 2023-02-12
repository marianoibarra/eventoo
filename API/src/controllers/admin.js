const { Category, User, Address, RoleAdmin, Event } = require("../db");

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
    const user = await User.findOne({
      where: { id },
      include: [{ model: RoleAdmin }],
    });
    user.roleAdmin.name =
      user.roleAdmin.name === "ADMIN"
        ? (user.roleAdmin.name = "USER")
        : (user.roleAdmin.name = "ADMIN");
    await user.roleAdmin.update({ name: user.roleAdmin.name });
    res.send(user.roleAdmin);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const changeStatusEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = Event.findByPk(id);
    await event.update({
      isActive: !event.isActive,
    });
    res.json(event.isActive);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  changeBan,
  getCategories,
  changeRole,
  changeStatusEvent,
};
