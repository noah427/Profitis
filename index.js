require("dotenv").config();
const { Client } = require("klasa");

var Klient = new Client({
  clientOptions: {
    fetchAllMembers: false
  },
  prefix: "$",
  cmdEditing: true,
  typing: true,
  readyMessage: client =>
    `${client.user.tag}, Ready to serve ${client.guilds.size} guilds and ${client.users.size} users`
})

// run evaluation tasks on servers

Klient.login(process.env.TOKEN);
