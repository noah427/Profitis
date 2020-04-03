const { Command } = require("klasa");
const {getUser} = require("../../Database/index");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "balance",
      enabled: true,
      runIn: ["text", "dm", "group"],
      cooldown: 0,
      aliases: ["bal"],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: "Usage: $bal <user mention|user ID>",
      quotedStringSupport: false,
      usage: "[target:user]",
      usageDelim: " ",
      extendedHelp: "It checks the balance! What more do you need?"
    });
  }

  async run(msg, [target]) {
    getUser(
      target ? target.id : msg.author.id,
      target ? target.username +"#" +  target.discriminator : msg.author.tag,
      user => {
        msg.channel.send(
          `${target ? target.username + "'s" : "Your"} balance is : ${
            user.balance
          }`
        );
      }
    );
  }

  async init() {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
};
