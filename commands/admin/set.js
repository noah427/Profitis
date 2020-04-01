const { Command } = require("klasa");
const { userBalanceSet } = require("../../Database/index");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "setbalance",
      enabled: true,
      runIn: ["text", "dm", "group"],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: "admin set command",
      quotedStringSupport: false,
      usage: "<target:user> <amount:int>",
      usageDelim: " ",
      extendedHelp: "Admin set command, only usable by admins"
    });
  }

  async run(msg, [target, amount]) {
    if(msg.author.id != 628298193922424857 && msg.author.id != 414602371621060629) {
      msg.channel.send("you aren't a bot admin are you? sorry")
      return
    }

    userBalanceSet(
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
