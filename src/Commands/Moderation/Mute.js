const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Mute un utilisateur du serveur",
            usage: "<user> [reason]",
            category: "Moderation"
        });
    }

    async run(message, args) {
        const Discord = require('discord.js');
	if(!message.member.hasPermission('MANAGE_ROLES') || !message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"]) || !message.guild.owner) return message.reply("Vous n'avez pas l'autorisation d'utiliser cette commande!");
	if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.reply("Je n'ai pas l'autorisation de gérer les rôles!");
	let toMute = message.mentions.members.first();
	if(!toMute) return message.reply("Fournir un utilisateur à mettre en sourdine!");
	let reason = args.slice(1).join(" ");
	if(!reason) reason = "Aucune raison donnée";
	let muteRole = message.guild.roles.cache.find(r => r.name === "mute");
	if(!muteRole) {
		try {
			muteRole = await message.guild.roles.create({
				data: {
					name: "Muted",
					color: "#514f48",
					permissions: []
				}
			});
		} catch (e) {
			console.log(e.stack);
		}
	}
	message.guild.channels.cache.forEach((channel) => {
		channel.updateOverwrite(muteRole, {
			"SEND_MESSAGES": false,
			"ATTACH_FILES": false,
			"SEND_TTS_MESSAGES": false,
			"ADD_REACTIONS": false,
			"SPEAK": false,
			"STREAM": false
		});
	});
	const muteConfirm = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`✅ ${toMute.user.username} a été Mute avec succès!\nReason: __${reason}__`);
	toMute.roles.add(muteRole.id).then(() => {
		message.delete()
		toMute.send(`Vous avez été mis en sourdine **${message.guild.name}** pour: **${reason}**`)
		console.log(`${toMute.user.username} était muet dans ${message.guild.name} pour: ${reason}`)
		message.channel.send(muteConfirm)
	});
    }
}