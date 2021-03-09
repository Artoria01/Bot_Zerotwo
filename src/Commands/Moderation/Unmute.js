const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "UnMute un utilisateur du serveur",
            usage: "<user>",
            category: "Moderation"
        });
    }

    async run(message, args) {
        const Discord = require('discord.js');
    if(!message.member.hasPermission('MANAGE_ROLES') || !message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"]) || !message.guild.owner) return message.reply("Vous n'avez pas l'autorisation d'utiliser cette commande!");
	if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.reply("Je n'ai pas l'autorisation de gérer les rôles!");
    let toUnmute = message.mentions.members.first();
    if(!toUnmute) return message.reply("Fournir un utilisateur à UnMute");
    let muteRole = message.guild.roles.cache.find(r => r.name === "mute");
    const unmuteConfirm = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription(`✅ ${toUnmute.user.username} a été UnMute avec succès!`);
    toUnmute.roles.remove(muteRole.id).then(() => {
        message.delete()
        toUnmute.send(`Vous avez été UnMute dans **${message.guild.name}**`)
        console.log(`${toUnmute.user.username} a été UnMute dans ${message.guild.name}`)
        message.channel.send(unmuteConfirm)
    });
    }
}