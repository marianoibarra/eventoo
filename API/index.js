;const app = require('./src/app.js');
const { conn } = require('./src/db.js');
const fillTables = require('./src/helpers/fillTables.js');
const port = process.env.PORT || 3001;

conn.sync({ alter: true })
  .then(() => fillTables())
  .then(() =>
    app.listen(port, () => console.log(`Listening on port ${port}!`))
  );

