const { Category } = require("../db");

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

module.exports = {
  getCategories,
};
