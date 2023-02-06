const app = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config();
const fillTables = require("./src/helpers/fillTables.js");
const { createSuperAdmin } = require("./src/helpers/createSuperAdmin.js");
const data=require('./src/mocks/superAdmin.js')
require("./src/helpers/error-handler");

const port = process.env.PORT || 3001;

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception: ", err);
  process.exit(1);
});

conn.sync({ force: false })
  .then(() => fillTables())
  .then(()=> createSuperAdmin(data))
  .then(() =>
    app.listen(port, () => console.log(`Listening on port ${port}!`))
  );
