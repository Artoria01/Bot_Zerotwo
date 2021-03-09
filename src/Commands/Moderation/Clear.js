const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Supprime plus d'un message à la fois",
            usage: "<amount>",
            category: "Moderation",
            aliases: ["purge"]
        });
    }

    async run(message, args) {
        if (!args[0]) return message.reply('Vous n’avez pas donné une quantité de messages qui devraient être supprimés!');
        if (isNaN(args[0])) return message.reply("Le paramètre de quantité n'est pas un nombre!");
        if (args[0] > 100) return message.reply("Vous ne pouvez pas supprimer plus de 100 messages à la fois!");
        if (args[0] < 1) return message.reply('Vous devez supprimer au moins 1 message!');

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("Vous n'avez pas l'autorisation d'exécuter cette commande!");
    
        await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
            message.channel.bulkDelete(messages)
        });
    }
}