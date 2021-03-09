const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: 'Employé Discord',
	DISCORD_PARTNER: 'Partenaire Discord',
	BUGHUNTER_LEVEL_1: 'Chasseur de bogues (Level 1)',
	BUGHUNTER_LEVEL_2: 'Chasseur de bogues (Level 2)',
	HYPESQUAD_EVENTS: 'Événements HypeSquad',
	HOUSE_BRAVERY: 'Maison de la bravoure',
	HOUSE_BRILLIANCE: 'Maison de la brillance',
	HOUSE_BALANCE: 'Maison de l\'équilibre',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Bot vérifié',
	VERIFIED_DEVELOPER: 'Développeur de bot vérifié'
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['user', 'ui'],
			description: 'Affiche des informations sur un utilisateur fourni ou sur l\'auteur du message.',
			category: 'Information',
			usage: '[user]'
		});
	}

	async run(message, [target]) {
		const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
		const userFlags = member.user.flags.toArray();
		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || 'BLUE')
			.addField('Utilisateur', [
				`**❯ Nom d'utilisateur:** ${member.user.username}`,
				`**❯ Discriminateur:** ${member.user.discriminator}`,
				`**❯ ID:** ${member.id}`,
				`**❯ Drapeaux:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				`**❯ Avatar:** [Lien vers l'avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
				`**❯ Crée le:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
				`**❯ Status:** ${member.user.presence.status}`,
				`**❯ Jeu:** ${member.user.presence.game || 'Ne joue a aucun jeu.'}`,
				`\u200b`
			])
			.addField('Membre', [
				`**❯ Rôle le plus élevé:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
				`**❯ A rejoint le serveur le:** ${moment(member.joinedAt).format('LL LTS')}`,
				`**❯ Rôle le plus haut de la liste:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
				`**❯ Rôles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
				`\u200b`
			]);
		return message.channel.send(embed);
	}

};
