const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { Player } = require('discord-player');
const SpotifyWebApi = require('spotify-web-api-node');
const { Queue } = require('better-queue');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, '/commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const eventFiles = fs.readdirSync(path.join(__dirname, '/events')).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

const player = new Player(client, {
    ytdlOptions: {
        filter: 'audioonly',
        highWaterMark: 1 << 25
    }
});

const spotifyApi = new SpotifyWebApi({
    clientId: ("34462bd05795401e94603aba8470eae5"),
    clientSecret: ("c165c82caa414e5d9daa9933aeacc9ad")
});

keepAlive();

client.login(process.env.token);
