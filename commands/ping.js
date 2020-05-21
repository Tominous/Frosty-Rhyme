const Discord = require('discord.js')
const client = new Discord.Client()

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send("Pong")
	},
};