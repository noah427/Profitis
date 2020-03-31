const sql = require("sqlite3");
var db = new sqlite3.Database("./database.db");

db.serialize(function() {
  db.run(
    "CREATE TABLE IF NOT EXISTS guilds (guildID TEXT UNIQUE, guildName TEXT, guildMemberCount INTEGER)"
  );
  // Create server worth table

  // Create user worth table
});

const addServerDB = db.prepare("INSERT INTO guilds (?,?,?)");

module.exports.addServer = (id, name, memberCount) => {
  addServerDB.run(id, name, memberCount)
};

db.close();
