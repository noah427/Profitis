const { Command } = require("klasa");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "support",
      enabled: true,
      runIn: ["text", "dm", "group"],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: "Sends a link to the support server",
      quotedStringSupport: false,
      usage: "",
      usageDelim: " ",
      extendedHelp: "",
    });
  }

  async run(msg) {
    msg.channel.send(
      "Join the support server to get help or give feedback : https://discord.gg/HJ7uHBp"
    );
  }

  async init() {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
};
