const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Affiche un skin Minecraft par un pseudonyme fourni pour l'édition Java",
            usage: "<user>",
            category: "Fun",
            aliases: ["mcskin"]
        });
    }

    async run(message, args) {
        const Discord = require('discord.js');
        if(!args[0]) return message.reply("Entrez un nom d'utilisateur Minecraft Java Edition pour obtenir son skin!");
        const skin = new Discord.MessageEmbed()
        .setTitle(`${args[0]}`)
        .setColor(`RANDOM`)
        .setImage(`https://minotar.net/armor/body/${args[0]}/150.png`)
        .setURL(`https://minotar.net/download/${args[0]}`)
        .setFooter("API fournie par Minotar");
        message.channel.send(skin);
    }
}