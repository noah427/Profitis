const sql = require("sqlite3");
var db = new sql.Database("./database.db");

// Reminder
Share = {
  serverID: "",
  price: 0,
  amount: 0,
  serverName: ""
};

db.serialize(function() {
  // Create user worth table

  db.run(
    "CREATE TABLE IF NOT EXISTS users (userID TEXT UNIQUE, userTag TEXT, balance INTEGER)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS market (serverID TEXT, price INT, amount INT, serverName TEXT, forSale INT, ownerID TEXT, ownerTag TEXT)"
  );
});

const getUserDB = db.prepare("SELECT * FROM users WHERE userID = ?");
const addUserDB = db.prepare("INSERT INTO users VALUES (?,?,?)");
const setUserDB = db.prepare("UPDATE users SET balance = ? WHERE userID = ?");
const userTopDB = db.prepare("SELECT * FROM users ORDER BY balance DESC");

const marketUploadDB = db.prepare("INSERT INTO market VALUES (?,?,?,?,?,?,?)");
const marketDownloadDB = db.prepare("SELECT * FROM market");
const marketRemoveDB = db.prepare(
  "DELETE FROM market WHERE serverID = ? AND ownerID = ? AND forSale = ?"
);

module.exports.addUser = (ID, tag) => {
  addUserDB.run(String(ID), tag, 100);
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

module.exports.addSharesToUser = (id, tag, shares, forSale) => {
  share = shares;

  console.log(share);

  console.log(id, tag);

  marketUploadDB.run(
    share.serverID,
    share.price,
    share.amount,
    share.serverName,
    forSale,
    id,
    tag
  );
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
  console.log("CRASH B$ HERE")
};

module.exports.marketUpload = (
  { serverID, price, amount, serverName },
  forSale,
  ownerID,
  ownerTag
) => {
  marketUploadDB.run(
    serverID,
    price,
    amount,
    serverName,
    forSale,
    ownerID,
    ownerTag
  );
};

module.exports.marketDownload = cb => {
  marketDownloadDB.all((err, result) => {
    cb(result);
  });
};

module.exports.marketRemove = (serverID, ownerID, forSale) => {
  console.log(serverID, ownerID, forSale);
  marketRemoveDB.run(serverID, ownerID, forSale);
};
