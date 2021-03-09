const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Expulse un utilisateur du serveur",
            usage: "<user>",
            category: "Moderation"
        });
    }

    async run(message) {
        if(message.channel.type == 'DM') return message.reply('Vous ne pouvez utiliser cette commande que sur les serveurs');
	if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply("Vous n'avez pas l'autorisation d'exécuter cette commande!");
	let mentionMember = message.mentions.members.first();
	if(!mentionMember) return message.reply("Mentionnez l'utilisateur que vous souhaitez kick!");
	if(!mentionMember.kickable) return message.reply("Je n'ai pas l'autorisation d'exclure cet utilisateur. A-t-il un rôle plus élevé? Ai-je la permission de le kick?");
	try {
		mentionMember.kick()
	} catch (error) {
		message.reply("Impossible de renvoyer cet utilisateur, a-t-il un rôle plus élevé? Ai-je la permission de le kick?");
	}
	const Discord = require('discord.js');
	const kickConfirm = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`✅ ${mentionMember} a été expulsé avec succès!`);
	message.channel.send(kickConfirm);
    }
}