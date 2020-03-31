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

Klient.on("ready", () => {

  Klient.user.setStatus("dnd");
  console.log("Bot started");
  
        Klient.user.setActivity("The DOW Jones fall", {
          url: "",
          type: "WATCHING"
        }); 
})
// run evaluation tasks on servers

Klient.login(process.env.TOKEN);
