const Command = require('../../Structures/Command');
const request = require('request');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Réponses à vos questions...",
            usage: "<question>",
            category: "Fun"
        });
    }

    async run(message, args) {
        const Discord = require('discord.js');
        const question = args.slice(0).join(' ');
        if(!question) return message.channel.send("Tu n'as pas posé de question");
        const url = 'https://8ball.delegator.com/magic/JSON/' + question;
        request(url, function(err, response, body) {
            if(err) {
                message.channel.send("Impossible d'obtenir les réponses 8ball, réessayez plus tard.");
            }
            body = JSON.parse(body);
            let embedColor = `RANDOM`;
            if(body.magic.type === "Affirmatif") embedColor = "#0dba35";
            if(body.magic.type === "Contraire") embedColor = "#ba0d0d";
            if(body.magic.type === "Neutre") embedColor = "#6f7275";
            const eightBallEmbed = new Discord.MessageEmbed()
            .setTitle("8ball")
            .setColor(embedColor)
            .setThumbnail(message.author.avatarURL)
            .addField("Question: ", question, false)
            .addField("Demandé par: ", message.author.tag, false)
            .addField("Répondre: ", body.magic.answer, false)
            .setFooter("API fournie par Delegator 8ball");
            message.channel.send(eightBallEmbed);
        });
    }
}