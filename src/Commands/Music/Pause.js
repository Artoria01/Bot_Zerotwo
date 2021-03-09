const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["resume"],
            description: "Met en pause / reprend le lecteur",
            category: "Music"
        });
    }

    async run(message) {
        const { channel } = message.member.voice;
        const player = this.client.music.players.get(message.guild.id);
        if(!player || !player.queue[0]) return message.channel.send("Aucune chanson n'est actuellement diffusée dans ce serveur.");
        if(channel.id !== player.voiceChannel.id) return message.channel.send("Vous devez être dans mon canal vocal pour utiliser cette commande!");
        
        player.pause(player.playing);
        return message.channel.send(`${player.playing ? "▶️ repris" : "⏸️ mis en pause"}.`);
    }
}