const Command = require('../../Structures/Command');
const request = require('request');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Affiche quelques informations sur le serveur fourni. S'il y a un rôle appelé _mcpestatus, le bot utilisera 19132 comme port par défaut.",
            usage: "<ip> <port>",
            category: "Fun",
            aliases: ["mcstatus"]
        });
    }

    async run(message, args) {
        var port = args[1];
        if(!args[0]) return message.reply('Veuillez saisir l\'adresse IP du serveur Minecraft');
        if(!args[1]) {
            let mcpestatus = message.guild.roles.cache.find(r => r.name === "_mcpestatus");
            if(mcpestatus) {
                port = 19132;
            } else {
                port = 25565
            }
        }
        const url = 'https://api.mcsrvstat.us/2/' + args[0] + ':' + port;
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.channel.send('Erreur lors de l\'obtention de l\'état du serveur Minecraft...');
            }
            body = JSON.parse(body);
            var status = '**Statut de ' + args[0] + ':' + port + '**\n\nLe serveur est actuellement hors ligne.';
            if(body.online == true) {
                status = '**Statut de ' + body.motd.clean + '**\n\nLe serveur est actuellement en ligne';
                status += '\n__En ligne:__ ' + body.players.online + '/' + body.players.max;
                if(body.icon) {
                    status += '\n__Platform:__ Java Edition';
                    if(body.software) {
                        status += '\n__Software:__ ' + body.software;
                    }
                } else {
                    status += '\n__Platform:__ Bedrock Edition';
                    if(body.software) {
                        status += '\n__Software:__ ' + body.software + ' for MCPE ' + body.version;
                    }
                }
            }
            message.channel.send(status);
        });
    }
}