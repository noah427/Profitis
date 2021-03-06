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
      name: "buy",
      enabled: true,
      runIn: ["text", "dm", "group"],
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      botPerms: [],
      requiredSettings: [],
      description:
        "Usage: $buy <server name>::<amount>   (note: yout must include the ::)",
      quotedStringSupport: false,
      usage: "<serverName:string> <amount:int>",
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
      getUser(msg.author.id, msg.author.tag, (buyer) => {
        var validOffers = result.filter(
          (v) => v.serverName === serverName && v.forSale === 1
        );

        if (validOffers.length === 0) {
          msg.channel.send("that server is not availble to be bought");
          return;
        }

        let sellers = [];

        let spent = 0;

        for (var offer of validOffers) {
          if (offer.amount === amount) {
            if (buyer.balance - amount * offer.price < 0) {
              msg.channel.send("You're too poor, sorry");
              return;
            }

            marketRemove(offer.serverID, offer.ownerID, offer.forSale);

            sellers.push(offer.ownerTag);

            spent = amount * offer.price;

            // possibly not checking user has that stock

            // check that user owns a little of that stock to begin with

            // this could be ten times shorter if I wanted it to be

            result.forEach((r, i, a) => {
              console.log(i + 1, a.length);
              if (i + 1 === a.length) {
                marketUpload(
                  {
                    serverID: offer.serverID,
                    price: offer.price,
                    amount: 0,
                    serverName: offer.serverName,
                  },
                  0,
                  msg.author.id,
                  msg.author.tag
                );
              }
            });

            // add to stock amount in user inv

            marketChangeAmount(amount, offer.serverID, msg.author.id, 0);

            getUser(msg.author.id, msg.author.tag, (result) => {
              userBalanceSet(
                msg.author.id,
                msg.author.tag,
                result.balance - amount * offer.price,
                () => {}
              );
            });
          }

          // buy conditions

          if (offer.amount > amount) {
            if (buyer.balance - amount * offer.price < 0) {
              msg.channel.send("You're too poor, sorry");
              return;
            }

            marketChangeAmount(
              -amount,
              offer.serverID,
              offer.ownerID,
              offer.forSale
            );

            sellers.push(offer.ownerTag);

            spent = amount * offer.price;

            //the following codeblock fixes buying when you have none of a stock

            result.forEach((r, i, a) => {
              console.log(i + 1, a.length);
              if (i + 1 === a.length) {
                marketUpload(
                  {
                    serverID: offer.serverID,
                    price: offer.price,
                    amount: 0,
                    serverName: offer.serverName,
                  },
                  0,
                  msg.author.id,
                  msg.author.tag
                );
              }
            });

            // I already forgot what this does why didn't I add comments

            marketChangeAmount(amount, offer.serverID, msg.author.id, 0);

            getUser(msg.author.id, msg.author.tag, (result) => {
              userBalanceSet(
                msg.author.id,
                msg.author.tag,
                result.balance - amount * offer.price,
                () => {}
              );
            });
          }
        }

        msg.channel.send(
          `You have successfully purchased ${amount} shares of ${serverName} for a total of ${spent}$ from ${sellers.join(
            ","
          )}`
        );
      });
    });
  }

  async init() {
    // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
  }
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
