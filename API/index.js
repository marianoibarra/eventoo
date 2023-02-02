;const app = require('./src/app.js');
const { conn } = require('./src/db.js');
const fillTables = require('./src/helpers/fillTables.js');
require("./src/helpers/error-handler");
const port = process.env.PORT || 3001;

conn.sync({ force: true })
  .then(() => fillTables())
  .then(() =>
    app.listen(port, () => console.log(`Listening on port ${port}!`))
  );

