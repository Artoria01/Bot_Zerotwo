const OblivionClient = require('./Structures/OblivionClient');

const client = new OblivionClient();
client.start(process.env.TOKEN);
