const OblivionClient = require('./Structures/OblivionClient');

const client = new OblivionClient(config);
client.start(process.env.TOKEN);
