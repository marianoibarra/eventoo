const app = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config();
const fillTables = require("./src/helpers/fillTables.js");
const { createSuperAdmin } = require("./src/helpers/createSuperAdmin.js");
const data = require("./src/mocks/superAdmin.js");
const cronJob = require("./src/helpers/finishedEvents.js");

const port = process.env.PORT || 3001;

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception: ", err);
  process.exit(1);
});

conn
  .sync({ alter: true })
  .then(() => fillTables())
  .then(() => createSuperAdmin(data))
  .then(() => cronJob.start())
  .then(() => app.listen(port, () => console.log(`Listening on port ${port}!`)))
  .catch((e) => console.log(e));
