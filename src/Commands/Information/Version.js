const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['ver'],
            description: "Affiche plus d'informations sur le bot",
            category: "Informations"
        });
    }

    async run(message) {
        let verMsg = "__**ZERO TWO**__\n";
        verMsg += "Il s'agit d'un bot entièrement conçu dans Discord.js et d'autres bibliothèques.\n";
        verMsg += "Le service de musique est réalisé avec Erela.js et Lavalink.\n";
        verMsg += "Le bot est fait avec cœur par <@237101750610296832>.\n";
        return message.channel.send(verMsg);
    }
}
