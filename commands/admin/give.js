const { Command } = require("klasa");
const { adminGive } = require("../../Database/index");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "give",
      enabled: true,
      runIn: ["text", "dm", "group"],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: "",
      quotedStringSupport: false,
      usage: "<target:user> <amount:int>",
      usageDelim: " ",
      extendedHelp: ""
    });
  }

  async run(msg, [target, amount]) {
    if (isNaN(Number(amount)) || amount < 1) {
      msg.channel.send("Illegal move");
      return;
    }
    
    if(msg.author.id != 628298193922424857 && msg.author.id != 414602371621060629) {
      msg.channel.send("you aren't a bot admin are you? sorry")
      return
    }

    adminGive(
      target.id,
      target.username + "#" + target.discriminator,
      amount,
      newBal => {
        msg.channel.send(`${target.username}'s new balance is : ${newBal}`);
      }
    );
  }

  async init() {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
};
