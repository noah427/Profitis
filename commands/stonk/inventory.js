const { Command } = require("klasa");
const { getUser } = require("../../Database/index");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "inventory",
      enabled: true,
      runIn: ["text", "dm", "group"],
      cooldown: 0,
      aliases: ["inv"],
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
    getUser(msg.author.id, msg.author.tag, result => {
      msg.channel.send(makeEmbed(JSON.parse(result.shares)));
    });
  }

  async init() {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
};

function makeEmbed(inventory) {
  let embed = new MessageEmbed();

  embed.setTitle("PROFITIS : Stocks Inventory");

  if (inventory.length === 0)
    embed.addField("Your inventory is empty, go buy some stocks");

  for (row of inventory) {
    embed.addField(
      `Server : ${row.serverName}`,
      `You have ${row.amount} shares worth $${row.price} each`
    );
  }

  embed.setFooter(`You own stock in ${inventory.length} different servers`);

  return embed;
}
