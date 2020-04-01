const sql = require("sqlite3");
var db = new sql.Database("./database.db");

db.serialize(function() {
  db.run(
    "CREATE TABLE IF NOT EXISTS guilds (guildID TEXT UNIQUE, guildName TEXT, guildMemberCount INTEGER, guildValue INTEGER, guildRevenue INTEGER, guildOwnerID TEXT, guildSharesAvailable INTEGER, guildSharesOwned INTEGER, guildSharesTotal INTEGER)"
  );
  // Create server worth table

  // Create user worth table

  db.run(
    "CREATE TABLE IF NOT EXISTS users (userID TEXT UNIQUE, userTag TEXT, balance INTEGER, shares TEXT)"
  );
});

const addServerDB = db.prepare("INSERT INTO guilds VALUES (?,?,?,?,?,?,?,?,?)");
const serverTopDB = db.prepare("SELECT * FROM guilds ORDER BY guildValue DESC");
const getUserDB = db.prepare("SELECT * FROM users WHERE userID = ?");
const addUserDB = db.prepare("INSERT INTO users VALUES (?,?,?,?)");
const setUserDB = db.prepare("UPDATE users SET balance = ? WHERE userID = ?");
const userTopDB = db.prepare("SELECT * FROM users ORDER BY balance DESC");

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

module.exports.addUser = (ID, tag) => {
  addUserDB.run(String(ID), tag, 100, "");
};

module.exports.userTop = cb => {
  userTopDB.all((err, list) => cb(list));
};

module.exports.adminGive = (id, tag, amount, cb) => {
  this.getUser(id, tag, res => {
    const currentBalance = res.balance;
    const newBalance = currentBalance + amount;




    setUserDB.run(newBalance, id);

    cb(newBalance);
  });
};

module.exports.userBalanceSet = (id, tag, amount, cb) => {
  this.getUser(id, tag, res => {
    setUserDB.run(amount, id);

    cb(amount);
  });
};

module.exports.getUser = (id, tag, cb) => {
  getUserDB.get(id, (err, res) => {
    if (!res) {
      this.addUser(id, tag);
      cb({ balance: 100 });
    } else {
      cb(res);
    }
  });
};
