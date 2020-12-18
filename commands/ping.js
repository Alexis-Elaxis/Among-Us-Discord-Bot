module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args, checkbl) {
		message.channel.send('Pong.');
	},
};
