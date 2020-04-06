const { Command } = require("klasa");
const { removeUser } = require("../../Database/index");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "removeUser",
      enabled: true,
      runIn: ["text", "dm", "group"],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: "",
      quotedStringSupport: false,
      usage: "<target:user>",
      usageDelim: " ",
      extendedHelp: "",
    });
  }

  async run(msg, [target]) {
    if (
      msg.author.id != 628298193922424857 &&
      msg.author.id != 414602371621060629
    ) {
      msg.channel.send("you aren't a bot admin are you? sorry");
      return;
    }

    removeUser(target.id, target.discriminator);

    
  }

  async init() {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
};
