const { Command } = require("klasa");
const {
  marketDownload,
  marketRemove,
  marketUpload,
  userBalanceSet,
  getUser,
  marketChangeAmount,
} = require("../../Database/index");

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
      description:
        "Usage: $sell <server name>::<amount>   (note: yout must include the ::)",
      quotedStringSupport: false,
      usage: "<serverName:string> <amount:int>", // add sorting later?? No.
      usageDelim: "::",
      extendedHelp: "don't forget the ::",
    });
  }

  async run(msg, [serverName, amount]) {
    if (isNaN(Number(amount)) || amount < 1) {
      msg.channel.send("Illegal move");
      return;
    }

    marketDownload((result) => {
      const rows = result.filter((v) => v.ownerID === msg.author.id);
      if (rows.length == 0) {
        msg.channel.send("You need to have stocks to sell stocks");
        return;
      }

      for (var row of result) {
        if (row.serverName === serverName) {
          if (row.amount - amount < 0) {
            msg.channel.send("You don't own enough of that stock");
            return;
          }

          // Change amount of stock user has aslong as when they sell they still have some
          if (row.amount - amount > 0) {
            marketChangeAmount(-amount, row.serverID, msg.author.id, 0);

            console.log("left over");
          } else {
            // if they won't have any left over completely delete it
            marketRemove(row.serverID, msg.author.id, 0);
          }

          // upload stock on stock market
          marketUpload(
            {
              serverID: row.serverID,
              price: row.price,
              serverName: row.serverName,
              amount: amount,
            },
            1,
            msg.author.id,
            msg.author.tag
          );

          getUser(msg.author.id, msg.author.tag, (result) => {
            userBalanceSet(
              result.userID,
              result.userTag,
              result.balance + amount * row.price,
              () => {}
            );
          });

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
