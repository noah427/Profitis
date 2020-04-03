const { Command } = require("klasa");
const {
  addSharesToUser,
  marketDownload
} = require("../../Database/index");

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
      description: "Usage: $optin",
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
    marketDownload(result => {
      for (var row of result) {
        if (
          row.serverName === msg.guild.name &&
          row.ownerID === msg.author.id
        ) {
          msg.channel.send("You can't optin more than once");
          return;
        }
      }

      addSharesToUser(msg.author.id, msg.author.tag, {
        serverID: msg.guild.id,
        price: 2,
        amount: 100,
        serverName: msg.guild.name
      }, 0);

      msg.channel.send(
        "You have opted your server into the game, try the $inventory command to see your stocks"
      );
    });
  }
  async init() {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
};
