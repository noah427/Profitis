require("dotenv").config();
const { Client } = require("klasa");


var Klient = new Client({
  clientOptions: {
    fetchAllMembers: false
  },
  prefix: "$",
  cmdEditing: true,
  typing: true,
})


// run evaluation tasks on servers

Klient.login(process.env.TOKEN);
