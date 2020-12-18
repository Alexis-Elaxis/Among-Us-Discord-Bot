const config = require('./json/conf.json');

const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const file = JSON.parse(fs.readFileSync("./json/servers.json"));

client.on("ready", () => {
    console.log("Bot démarré !");
    client.user.setActivity("be a crewmate. | a!start for start a game")
});
    
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
    }
    if (command === 'start') {
		client.commands.get('start').execute(message, args, client);
    }
});

client.login(config.token)
