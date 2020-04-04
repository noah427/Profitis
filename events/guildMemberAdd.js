const { Event } = require("klasa");
const { marketChangePrice, marketDownload } = require("../Database/index");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, { name: "guildMemberAdd", enabled: true });
  }

  run(member) {
    marketDownload((result) => {
      let validServers = result.filter((v) => v.serverID === member.guild.id);

      if (validServers[0]) {
        marketChangePrice(member.guild.memberCount / 10, member.guild.id);
      }
    });
  }

  async init() {}
};
