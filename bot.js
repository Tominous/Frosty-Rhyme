const config = require("./config.json")
const token = config.token
const prefix = config.prefix
const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require("fs")
const { ErelaClient } = require("erela.js")
client.commands = new Discord.Collection();

client.once('ready', async () => {
    client.music = new ErelaClient(client, [
        {
            host: "localhost",
            port: 7500,
            password: "anotherday"
        }
    ])
    client.musicPlayers = new Map();
	console.log('Ready!');
    client.music.on("nodeConnect", node => console.log("new node connected"));
    client.music.on("nodeError", (node, error) => console.log(`Node error: ${error.message}`));
    client.music.on("trackStart", (player, track) => player.textChannel.send(`Now playing: ${track.title}`));
    client.music.on("queueEnd", player => {
        player.textChannel.send("Queue has ended.")
        client.music.players.destroy(player.guild.id);
    });
});







const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

try {
	client.commands.get(command).execute(client, message, args);
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!, if this error persists please DM the dev');
}
});



client.login(token)
