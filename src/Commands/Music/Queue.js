const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['q'],
            description: "Affiche toutes les pistes mises en file d'attente",
            category: "Music"
        });
    }

    async run(message) {
        const player = this.client.music.players.get(message.guild.id);
        if(!player || !player.queue[0]) return message.channel.send("Aucune chanson n'est actuellement diffusée dans ce serveur.");
        let index = 1;
        let string = "";

        if(player.queue[0]) string += `🎶 __**Lecture en cours**__\n${player.queue[0].title} - Demandé par **${player.queue[0].requester.username}**\n`;
        if(player.queue[1]) string += `📁 __**Toute la file d'attente**__\n${player.queue.slice(1, 10).map(x => `**${index++})** ${x.title} - Demandé par **${x.requester.username}**`).join("\n")}`;

        const embed = new MessageEmbed()
        .setAuthor(`📁 File d'attente actuelle pour ${message.guild.name}`, message.guild.iconURL)
        .setThumbnail(player.queue[0].thumbnail)
        .setColor("RANDOM")
        .setDescription(string);

        return message.channel.send(embed);
    }
}