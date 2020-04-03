const { Command } = require("klasa");
const { adminGive } = require("../../Database/index");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "gift",
      enabled: false,
      runIn: ["text", "dm", "group"],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: "Usage: $gift <user mention|user id> <amount>",
      quotedStringSupport: false,
      usage: "<target:user> <amount:int>",
      usageDelim: " ",
      extendedHelp: "give ur money to bernie",
    });
  }

  async run(msg, [target, amount]) {
    adminGive(
      target.id,
      target.username + "#" + target.discriminator,
      amount,
      (newBal) => {
        msg.channel.send(`${target.username}'s new balance is : ${newBal}`);
      }
    );

    adminGive(msg.author.id, msg.author.tag, -amount, (newBal) => {
      msg.channel.send(`Your new balance is : ${newBal}`);
    });
  }

  async init() {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
};
