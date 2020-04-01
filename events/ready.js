const { Event } = require("klasa");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, { name: "ready", enabled: true });
  }

  run() {
    this.client.user.setPresence({
      status: "dnd",
      activity: {
        type: "WATCHING",
        name: "The DOW Jones crash."
      }
    });

    console.log(`Logged in as ${this.client.user.tag}`)
    }

  async init() {}
};
