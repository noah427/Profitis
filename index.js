require("dotenv").config();
const { Client } = require("klasa");


var Klient = new Client({
  clientOptions: {
    fetchAllMembers: false
  },
  prefix: "$",
  cmdEditing: true,
  typing: true,
  readyMessage: "The bot has started",
  ownerID: "628298193922424857"
})



// run evaluation tasks on servers

Klient.login(process.env.TOKEN);
