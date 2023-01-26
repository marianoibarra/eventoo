const categoryMock = require("../mocks/category");
const {Category, Modality} = require("../db");

const fillTables = async () => {
  await Category.bulkCreate(categoryMock, {
    include: [ Modality ]
  })   
}

module.exports = fillTables