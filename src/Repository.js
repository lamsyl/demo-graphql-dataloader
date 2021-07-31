const DataLoader = require("dataloader");

const debug = require("debug")("demo-dataloader:repository");

class Repository {
  db;
  personDataLoader;

  constructor(dbConnection) {
    this.db = dbConnection;
    this.personDataLoader = new DataLoader(
      (keys) => this.queryMultiplePersonByIDs(keys),
      {
        cache: true,
      }
    );
  }

  async loadPersonByID(personID) {
    return this.personDataLoader.load(personID);
  }

  async queryAllSongs() {
    const sql = `
SELECT * FROM song;
    `;
    debug("queryAllSongs", sql);
    return this.db.raw(sql);
  }

  async queryPersonByID(personID) {
    const sql = `
SELECT * FROM person
WHERE id = ?
`;
    const args = [personID];
    debug("queryPersonByID", sql, args);
    const result = await this.db.raw(sql, args);
    if (result.length === 0) {
      return null;
    }
    return result[0];
  }

  async queryMultiplePersonByIDs(personIDs) {
    const sql = `
SELECT * FROM person
WHERE id in (??)
`;
    const args = [personIDs];
    debug("queryMultiplePersonByIDs", sql, args);
    const result = await this.db.raw(sql, args);
    return result;
  }
}

module.exports = {
  Repository,
};
