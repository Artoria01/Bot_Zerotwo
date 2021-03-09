const { Client, Collection } = require('discord.js');
const Util = require('./Util.js');
const { ErelaClient } = require('erela.js');
const nodes = [
    {
        host: "localhost",
        port: 8000,
        password: "jdkpass",
    }
]

module.exports = class OblivionClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone'
		});
		this.validate(options);

		this.commands = new Collection();

		this.aliases = new Collection();

		this.utils = new Util(this);

		this.once('ready', () => {
			console.log(`[Oblivion] Ready to go!`);
			console.log(`[Oblivion] Logged in as ${this.user.username}!`);
			this.music = new ErelaClient(this, nodes);
			this.music.on("nodeConnect", node => console.log("[Erela.js] New node connected"));
			this.music.on("nodeError", (node, error) => console.log(`[Erela.js] Node error: ${error.message}`));
			this.music.on("trackStart", (player, track) => player.textChannel.send(`🎶 **Lecture en cours:** \`${track.title}\`.`));
			this.music.on("queueEnd", player => {
				this.music.players.destroy(player.guild.id);
			});
			this.user.setActivity(`${this.prefix}help | Artoria`);
		});

		this.on('message', async (message) => {
			const mentionRegex = RegExp(`^<@!${this.user.id}>$`);
			const mentionRegexPrefix = RegExp(`^<@!${this.user.id}> `);

			if (!message.guild || message.author.bot) return;

			if (message.content.match(mentionRegex)) message.channel.send(`Mon préfixe pour ${message.guild.name} est \`${this.prefix}\`.`);

			const prefix = message.content.match(mentionRegexPrefix) ?
				message.content.match(mentionRegexPrefix)[0] : this.prefix;
			
			if(!message.content.startsWith(prefix)) return;

			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

			const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
			if (command) {
				command.run(message, args);
			}
		});
	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Les options doivent être un type d\'objet.');

		if (!options.token) throw new Error('Vous devez transmettre le jeton pour le client.');
		this.token = options.token;

		if (!options.prefix) throw new Error('Vous devez passer un préfixe pour le client.');
		if (typeof options.prefix !== 'string') throw new TypeError('Le préfixe doit être un type de chaîne.');
		this.prefix = options.prefix;

		this.owners = options.owners;
	}

	async start(token = this.token) {
		this.utils.loadCommands();
		super.login(token);
	}

};
