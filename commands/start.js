module.exports = {
	name: 'start',
	description: 'Start!',
	execute(message, args, client) {
		message.delete();
		message.channel.send('Starting.').then(msg => {
			msg.edit("Can I mention everyone for notif ?");
			msg.react('✅').then(() => msg.react('❌'));

			const filter = (reaction, user) => {
				return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
			};

			msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
				const reaction = collected.first();
				if (reaction.emoji.name === '✅') {
					msg.edit('Okey, I will mention.');
					removereactions(msg);
					msg.delete();

					message.channel.send(`**${message.author.username}** invited you to join her party. \nAdd reaction 🚪 for join this party. \nMention: @everyknow`).then(msg => {
						msg.react('🚪');
						const filter = (reaction, user) => {
							return ['🚪'].includes(reaction.emoji.name) && user.id !== client.user.id;
						};
						console.log(client.user.id);
						msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
							const reaction = collected.first();
							if (reaction.emoji.name === '🚪') {
								console.log(reaction.users);
							} else {
								msg.edit('Not here.');
							}
						}).catch(collected => {
							msg.edit('You reacted with neither a check mark, nor a red cross.');
						});
					})
				} else {
					msg.edit('Okey, I don\'t mention for this party.');
					removereactions(msg);
					msg.delete();

					message.channel.send(`**${message.author.username}** invited you to join her party. \nAdd reaction 🚪 for join this party. \nMention: @everyknow`).then(msg => {

					})
				}
			}).catch(collected => {
				msg.edit('You reacted with neither a check mark, nor a red cross.');
			});
		});

		function removereactions(string){
			string.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
		}
		
	},
};
