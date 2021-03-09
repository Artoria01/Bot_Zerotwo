const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["v"],
            description: "Règle le volume du lecteur",
            category: "Music",
            usage: "<volume>"
        });
    }

    async run(message, args) {
        const { channel } = message.member.voice;
        const player = this.client.music.players.get(message.guild.id);
        if(channel.id !== player.voiceChannel.id) return message.channel.send("Vous devez être dans mon canal vocal pour utiliser cette commande!");
        if(!player || !player.queue[0]) return message.channel.send("Aucune chanson n'est actuellement diffusée dans ce serveur.");
        if(!args[0]) return message.channel.send(`Volume actuel: **${player.volume}%**`);
        if(Number(args) <= 0 || Number(args) > 100) return message.channel.send("Vous pouvez régler le volume 1-100");
        player.setVolume(Number(args));
        return message.channel.send(`Volume réglé sur: **${player.volume}%**`);
    }
}