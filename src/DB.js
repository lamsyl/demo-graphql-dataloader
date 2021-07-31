const path = require("path");

const dbConnection = require("knex")({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "../song.db"),
  },
});

module.exports = { dbConnection };
