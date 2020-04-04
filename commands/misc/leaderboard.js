const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const { userTop } = require("../../Database/index");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "leaderboard",
      enabled: true,
      runIn: ["text", "dm", "group"],
      cooldown: 0,
      aliases: ["baltop", "lb"],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: "Usage: $lb [.....] ",
      quotedStringSupport: false,
      usage: "",
      usageDelim: undefined,
      extendedHelp: "It shows how far behind you are"
    });
  }

  async run(msg, [type]) {
    userTop(list => {
      msg.channel.send(embedMakerUser(list));
    });
  }

  async init() {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
};

function embedMakerUser(rows) {
  let embed = new MessageEmbed();
  embed.setTitle("PROFITIS : Balance Leaderboard");
  for (let row of rows) {
    embed.addField(row.userTag, row.balance);
  }

  return embed;
}
