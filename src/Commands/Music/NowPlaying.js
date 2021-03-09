const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { Utils } = require('erela.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['np'],
            description: "Affiche des informations sur la piste en cours de lecture",
            category: "Music"
        });
    }

    async run(message) {
        const player = this.client.music.players.get(message.guild.id);
        if(!player || !player.queue[0]) return message.channel.send("Aucune chanson n'est en cours de lecture dans votre serveur!");
        const { title, author, description, thumbnail, url, duration } = player.queue[0];

        const embed = new MessageEmbed()
        .setAuthor("🎶 Chanson en cours de lecture:", message.author.displayAvatarURL)
        .setThumbnail(thumbnail)
        .setDescription(stripIndents`
        ${player.playing ? "▶" : "⏸"} **${title}** \`${Utils.formatTime(duration, true)}\` de ${author}\n${url}
        `)
        .setColor("RANDOM");

        return message.channel.send(embed);
    }
}