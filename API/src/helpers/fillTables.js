const categoryMock = require("../mocks/category");
const {Category, RoleAdmin} = require("../db");

const fillTables = async () => {
  const roles = await RoleAdmin.findAll()
  if(roles.length===0) {
    await RoleAdmin.bulkCreate([{name: "SUPERADMIN"}, {name: "ADMIN"}, {name: "USER"}])
  }
  const categories = await Category.findAll()
  if(categories.length===0) {
    await Category.bulkCreate(categoryMock)
  }
}

module.exports = fillTables