const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Passe à la piste suivante de la file d'attente",
            category: "Music"
        });
    }

    async run(message) {
        const { channel } = message.member.voice;
        const player = this.client.music.players.get(message.guild.id);
        if(channel.id !== player.voiceChannel.id) return message.channel.send("Vous devez être dans mon canal vocal pour utiliser cette commande!");
        if(!player || !player.queue[0]) return message.channel.send("Aucune chanson n'est actuellement diffusée dans ce serveur.");
        player.stop();
        return message.channel.send("Passé à la chanson suivante");
    }
}