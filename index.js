const { token, prefix } = require('./config.js');
const fs = require("fs");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({ 
	intents: [		
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildWebhooks,
	],
});

client.prefix = prefix;

client.commands = new Collection();

fs.readdirSync('./commands/').forEach(folder => {
    const commands = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
		//console.log(`-> Loaded command ${file}`);
    };
});

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);