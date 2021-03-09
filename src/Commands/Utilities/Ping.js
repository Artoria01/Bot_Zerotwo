const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pong'],
			description: 'Cela fournit le ping du bot',
			category: 'Utilities'
		});
	}

	async run(message) {
		const msg = await message.channel.send('Pinging...');

		const latency = msg.createdTimestamp - message.createdTimestamp;
		const choices = ['Est-ce vraiment mon ping?', 'Est-ce correct? Je ne peux pas regarder!', 'J\'espère que ce n\'est pas mal!'];
		const response = choices[Math.floor(Math.random() * choices.length)];

		msg.edit(`${response} - Latence du bot: \`${latency}ms\`, Latence API: \`${Math.round(this.client.ws.ping)}ms\``);
	}

};
