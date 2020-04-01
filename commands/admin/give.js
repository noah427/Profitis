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
      description: "admin give command",
      quotedStringSupport: false,
      usage: "<target:user> <amount:int>",
      usageDelim: " ",
      extendedHelp: "Admin give command, only usable by admins"
    });
  }

  async run(msg, [target, amount]) {
    adminGive(
      target.id,
      target.username + target.discriminator,
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
