const { Event } = require("klasa");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, { name: "guildCreate", enabled: true });
  }

  run(guild) {
    try {
      guild.systemChannel.send(
        "Hi, my prefix is set to $, try $help for more info"
      );
    } catch (e) {
    }
  }

  async init() {}
};
