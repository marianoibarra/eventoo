const categoryMock = require("../mocks/category");
const {Category} = require("../db");

const fillTables = async () => {
  await Category.bulkCreate(categoryMock)
}

module.exports = fillTables