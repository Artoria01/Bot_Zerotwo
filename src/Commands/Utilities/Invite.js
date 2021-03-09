const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Envoie un message privé avec le lien de l'invitation du bot pour votre serveur",
            category: "Utilities"
        });
    }

    async run(message) {
        let invite = "https://discord.com/api/oauth2/authorize?client_id=" + this.client.user.id + "&permissions=8&scope=bot";
        message.channel.send("L'invitation a été envoyée dans votre DMs.");
        return message.author.send(invite);
    }
}