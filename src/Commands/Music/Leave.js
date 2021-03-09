const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['stop'],
            description: "Arrête la piste en cours de lecture",
            category: "Music"
        });
    }

    async run(message) {
        const { channel } = message.member.voice;
        const player = this.client.music.players.get(message.guild.id);

        if(channel && channel.id !== player.voiceChannel.id) return message.channel.send("Vous devez être dans mon canal vocal pour utiliser cette commande!");
        if(!player) return message.channel.send("Aucune chanson n'est actuellement diffusée dans ce serveur.");

        this.client.music.players.destroy(message.guild.id);
        return message.channel.send("🔇 Arrêt de la musique avec succès.");
    }
}