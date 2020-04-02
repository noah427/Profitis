const sql = require("sqlite3");
var db = new sql.Database("./database.db");

// Reminder
Share = {
  serverID: "",
  price: 0,
  amount : 0
};

db.serialize(function() {
  // Create user worth table

  db.run(
    "CREATE TABLE IF NOT EXISTS users (userID TEXT UNIQUE, userTag TEXT, balance INTEGER, shares TEXT)"
  );
});

const getUserDB = db.prepare("SELECT * FROM users WHERE userID = ?");
const addUserDB = db.prepare("INSERT INTO users VALUES (?,?,?,?)");
const setUserDB = db.prepare("UPDATE users SET balance = ? WHERE userID = ?");
const userTopDB = db.prepare("SELECT * FROM users ORDER BY balance DESC");
const setUserSharesDB = db.prepare(
  "UPDATE users SET shares = ? WHERE userID = ?"
);

module.exports.addUser = (ID, tag) => {
  addUserDB.run(String(ID), tag, 100, "[]");
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

module.exports.addSharesToUser = (id, tag, shares, cb) => {
  this.getUser(id, tag, res => {
    existingShares = JSON.parse(res.shares);
    existingShares.push(shares);
    setUserSharesDB.run(JSON.stringify(existingShares), id);
    cb(existingShares);
  });
};

module.exports.getUser = (id, tag, cb) => {
  getUserDB.get(id, (err, res) => {
    if (!res) {
      this.addUser(id, tag);
      cb({ balance: 100, shares: "[]" });
    } else {
      cb(res);
    }
  });
};
