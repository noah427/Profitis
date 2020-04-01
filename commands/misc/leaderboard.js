const { Command } = require('klasa');


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'leaderboard',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Prints the leaderboard for servers/users',
            quotedStringSupport: false,
            usage: '[target:user]',
            usageDelim: undefined,
            extendedHelp: 'Shows the leaderboard for servers/users using discord.js'
        });
    }

    async run(msg, target) {
        
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};