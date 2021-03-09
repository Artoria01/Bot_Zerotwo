const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['server', 'guild', 'guildinfo'],
			description: 'Affiche des informations sur le serveur sur lequel ledit message a été exécuté.',
			category: 'Information'
		});
	}

	async run(message) {
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const embed = new MessageEmbed()
			.setDescription(`**Informations du serveur pour __${message.guild.name}__**`)
			.setColor('BLUE')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('General', [
				`**❯ Nom:** ${message.guild.name}`,
				`**❯ ID:** ${message.guild.id}`,
				`**❯ Propriétaire:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
				`**❯ Region:** ${regions[message.guild.region]}`,
				`**❯ Niveau de boost:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				`**❯ Filtre explicite:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`**❯ Niveau de vérification:** ${verificationLevels[message.guild.verificationLevel]}`,
				`**❯ Crée le:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
				'\u200b'
			])
			.addField('Statistiques', [
				`**❯ Nombre de rôles:** ${roles.length}`,
				`**❯ Nombre d'emojis:** ${emojis.size}`,
				`**❯ Nombre d'emojis Ordinaire:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**❯ Nombre d'emojis Animé:** ${emojis.filter(emoji => emoji.animated).size}`,
				`**❯ Nombre de membres:** ${message.guild.memberCount}`,
				`**❯ Humains:** ${members.filter(member => !member.user.bot).size}`,
				`**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
				`**❯ Salon textuel:** ${channels.filter(channel => channel.type === 'text').size}`,
				`**❯ Salon Vocaux:** ${channels.filter(channel => channel.type === 'voice').size}`,
				`**❯ Nombre de boost:** ${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			])
			.addField('Activité', [
				`**❯ En ligne:** ${members.filter(member => member.presence.status === 'online').size}`,
				`**❯ Absant:** ${members.filter(member => member.presence.status === 'idle').size}`,
				`**❯ Ne pas déranger:** ${members.filter(member => member.presence.status === 'dnd').size}`,
				`**❯ Hors ligne:** ${members.filter(member => member.presence.status === 'offline').size}`,
				'\u200b'
			])
			.addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None')
			.setTimestamp();
		message.channel.send(embed);
	}

};
