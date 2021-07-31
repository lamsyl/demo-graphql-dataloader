const { Repository } = require("./Repository");
const { dbConnection } = require("./DB");

// Make new context for each request. This is usually the correct way to create context.
const context = (context) => ({
  repo: new Repository(dbConnection),
});

// // Reuse the same context for every request to see data loader caches.
// const context = {
//   repo: new Repository(dbConnection),
// };

module.exports = { context };
