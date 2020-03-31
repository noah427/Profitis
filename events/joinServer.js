const { Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, { name:'guildCreate', enabled: true });
    }

    run(Guild) {
       
    }

    async init() {
        
    }

};