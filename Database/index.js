const sql = require("sqlite3");
var db = new sqlite3.Database('./database.db');

db.serialize(function() {
  // Create server worth table

  // Create user worth table
});

db.close();