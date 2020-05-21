const Discord = require('discord.js')
const client = new Discord.Client()

module.exports = {
	name: 'stop',
	description: 'leave the vc',
	execute(client, message, args) {
		const { voiceChannel } = message.member;
        const player = client.music.players.get(message.guild.id);

        if(!player) return message.channel.send("No song/s currently playing in this guild.");
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the leave command.");

        client.music.players.destroy(message.guild.id);
        return message.channel.send("Successfully stopped the music.")
	},
};