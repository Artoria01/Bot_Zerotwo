const Command = require('../../Structures/Command');
const config = require('../../../config.json');
const OblivionClient = require('../../Structures/OblivionClient');
const newClient = new OblivionClient(config);

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Redémarrez le bot",
            category: "Owner"
        });
    }

    async run(message) {
        if (!this.client.owners.includes(message.author.id)) return message.channel.send("Seuls les propriétaires du robots peuvent le faire!");
        const msg = await message.channel.send("Redémarrage...");
        msg.delete()
        .then(this.client.destroy())
        .then(newClient.start());
        
    }
}