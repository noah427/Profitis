const { Command } = require("klasa");
const { marketDownload, marketRemove, marketUpload } = require("../../Database/index");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "sell",
      enabled: true,
      runIn: ["text", "dm", "group"],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description: "sell one of your stocks",
      quotedStringSupport: false,
      usage: "[serverName:string] [amount:int]", // add sorting later??
      usageDelim: " ",
      extendedHelp: ""
    });
  }

  async run(msg, [serverName, amount]) {
    marketDownload( result => {
      const rows = result.filter(v => v.ownerID === msg.author.id)
      if (rows.length == 0) {
        msg.channel.send("You need to have stocks to sell stocks");
        return;
      }

      for (var row of rows) {
        if (row.serverName === serverName) {
          marketRemove(row.serverID, msg.author.id, 0);
          marketUpload(
            {
              serverID: row.serverID,
              price: row.price,
              serverName: row.serverName,
              amount: amount
            },
            0,
            msg.author.id,
            msg.author.tag
          );
          if (row.amount - amount > 0) {
            marketUpload(
              {
                serverID: row.serverID,
                price: row.price,
                serverName: row.serverName,
                amount: row.amount - amount
              },
              1,
              msg.author.id,
              msg.author.tag
            );
          }
          msg.channel.send(
            `You have successfully sold ${amount} stock in ${serverName}`
          );
          return;
        }
      }

      msg.channel.send("You don't own stock in that server");
    });
  }

  async init() {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
};
