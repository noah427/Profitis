const { Command } = require("klasa");
const { getUser, addSharesToUser } = require("../../Database/index");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "optin",
      enabled: true,
      runIn: ["text", "dm", "group"],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: "opt your server into the game",
      quotedStringSupport: false,
      usage: "",
      usageDelim: " ",
      extendedHelp: "opt your server into the game"
    });
  }

  async run(msg) {
    if (msg.author.id != msg.guild.owner.id) {
      msg.channel.send(
        "you don't even own this server, you can only opt in your own server."
      );
      return;
    }
    getUser(msg.author.id, msg.author.tag, result => {
      for (let row of JSON.parse(result.shares)) {
        if (row.serverID === msg.guild.id) {
          msg.channel.send("You may not opt in more than once");
          return;
        }
      }

      addSharesToUser(
        msg.author.id,
        msg.author.tag,
        {
          serverID: msg.guild.id,
          price: 2,
          amount: 100,
          serverName: msg.guild.name
        },
        newShares => {}
      );

      msg.channel.send(
        "You have opted your server into the game, try the $inventory command to see your stocks"
      );
    });
  }
  async init() {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
};
