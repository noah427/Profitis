const { Command } = require("klasa");
const { marketDownload } = require("../../Database/index");
const { MessageEmbed } = require("discord.js");

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
      description: "view the market for trading stocks",
      quotedStringSupport: false,
      usage: "", // add sorting later??
      usageDelim: " ",
      extendedHelp: ""
    });
  }

  async run(msg) {
    marketDownload(res => {
      msg.channel.send(makeViewEmbed(res));
    });
  }

  async init() {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
};

function makeViewEmbed(list) {
  let embed = new MessageEmbed();

  embed.setTitle("PROFITIS : Market View ");

  var forSale = 0;

  for (row of list) {
    // console.log(row);
    embed.addField(
      `${row.amount} shares of ${row.serverName} ${
        row.forSale
          ? "owned by " + row.ownerTag
          : "for sale from " + row.ownerTag
      }`,
      `Market price : ${row.price}`
    );

    console.log(row)

    row.owned ? undefined : forSale++;
  }

  embed.setFooter(`${forSale} stocks for sale`);

  return embed;
}
