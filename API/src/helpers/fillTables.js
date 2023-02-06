const categoryMock = require("../mocks/category");
const {Category} = require("../db");

const fillTables = async () => {
  const categories = await Category.findAll()
  if(categories.length===0) {
    await Category.bulkCreate(categoryMock)
  }
}

module.exports = fillTables