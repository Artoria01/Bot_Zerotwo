const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Bannit un utilisateur du serveur",
            usage: "<user> [reason]",
            category: "Moderation"
        });
    }

    async run(message, args) {
        if(message.channel.type == 'DM') return message.reply('Vous ne pouvez utiliser cette commande que sur les serveurs');
	var user = message.mentions.users.first();
	const banReason = args.slice(1).join(' ');
	if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply("Vous n'avez pas l'autorisation d'exécuter cette commande!");
	if(!user) {
		try {
			if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Impossible d’obtenir un utilisateur Discord avec cet ID utilisateur!');
			user = message.guild.members.get(args.slice(0, 1).join(' '));
			user = user.user;
		} catch (error) {
			return message.reply('Impossible d’obtenir un utilisateur Discord avec cet ID utilisateur!');
		}
	}
	if (user === message.author) return message.channel.send('Vous ne pouvez pas vous interdire');
    if (!banReason) return message.reply('Vous avez oublié de saisir une raison pour cette interdiction!');
    message.guild.members.ban(user, { reason: banReason });
	const Discord = require('discord.js');
	const banConfirm = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`✅ ${user.tag} a été banni avec succès!\nReason: __${banReason}__`);
	message.channel.send(banConfirm);
    }
}