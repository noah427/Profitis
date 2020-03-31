const sql = require("sqlite3");
var db = new sql.Database("./database.db");

db.serialize(function() {
  db.run(
    "CREATE TABLE IF NOT EXISTS guilds (guildID TEXT UNIQUE, guildName TEXT, guildMemberCount INTEGER, guildValue INTEGER, guildRevenue INTEGER, guildOwnerID TEXT, guildSharesAvailable INTEGER, guildSharesOwned INTEGER, guildSharesTotal INTEGER)"
  );
  // Create server worth table

  // Create user worth table
});

const addServerDB = db.prepare("INSERT INTO guilds (?,?,?,?,?,?)");
const serverTopDB = db.prepare("SELECT * FROM guilds ORDER BY guildValue DESC");

module.exports.addServer = (id, name, memberCount, ownerID) => {
  addServerDB.run(
    String(id),
    name,
    memberCount,
    0,
    0,
    String(ownerID),
    0,
    0,
    0
  );
};

module.exports.serverTop = cb => {
  serverTopDB.all(list => cb(list));
};

db.close();
