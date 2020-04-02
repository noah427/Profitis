const { Command } = require("klasa");
const { getUser } = require("../../Database/index");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "market",
      enabled: true,
      runIn: ["text", "dm", "group"],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: "view your inventory of stocks",
      quotedStringSupport: false,
      usage: "", // add sorting later??
      usageDelim: " ",
      extendedHelp: ""
    });
  }

  async run(msg) {
      
  }

  async init() {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
};