const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Modifie le surnom de quelqu'un",
            usage: "<user> <nouveau pseudo>",
            category: "Moderation",
            aliases: ["nickname"]
        });
    }

    async run(message, args) {
        if(message.channel.type == 'DM') return message.reply('Vous ne pouvez utiliser cette commande que sur les serveurs');
        if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('Je n’ai pas l’autorisation de modifier les pseudonymes!');
        if(!message.member.hasPermission('MANAGE_NICKNAMES')) return message.reply("Vous n'avez pas l'autorisation d'exécuter cette commande!");
        let mentionMember = message.mentions.members.first();
        let newNickname = args.slice(1).join(' ');
        if(!mentionMember) return message.reply("Mentionnez l'utilisateur dont vous souhaitez modifier le pseudo");
        if(!newNickname) return message.reply("Saisissez le nouveau surnom de l'utilisateur que vous avez mentionné");
        if(!mentionMember.kickable) return message.reply("Impossible de changer le pseudo de cet utilisateur, a-t-il un rôle plus élevé? Ai-je la permission de changer son surnom?");
        try {
            mentionMember.setNickname(newNickname);
        } catch (error) {
            message.reply("Impossible de changer le pseudo de cet utilisateur, a-t-il un rôle plus élevé? Ai-je la permission de changer son surnom?");
        }
        message.channel.send(`Changement de surnom de ${mentionMember} à **${newNickname}**`);
    }
}