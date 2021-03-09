module.exports = class Command {

	constructor(client, name, options = {}) {
		this.client = client;
		this.name = options.name || name;
		this.aliases = options.aliases || [];
		this.description = options.description || 'Aucune description fournie.';
		this.category = options.category || 'Divers';
		this.usage = options.usage || 'Aucune utilisation fournie.';
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		throw new Error(`La command ${this.name} ne fournit pas de méthode d'exécution!`);
	}

};