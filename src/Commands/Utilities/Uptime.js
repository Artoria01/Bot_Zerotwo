const Command = require('../../Structures/Command');
const ms = require('ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ut'],
			description: 'Cela fournit la disponibilit√© actuelle du bot.',
			category: 'Utilities'
		});
	}

	async run(message) {
		message.channel.send(`Ma disponibilit√© est de \`${ms(this.client.uptime, { long: true })}\``);
	}

};
