const { Player } = require('discord-player');
const SpotifyWebApi = require('spotify-web-api-node');

module.exports = {
    name: 'music',
    async execute(message, args) {
        const player = new Player(message.client, {
            ytdlOptions: {
                filter: 'audioonly',
                highWaterMark: 1 << 25
            }
        });

        const spotifyApi = new SpotifyWebApi({
            clientId: '34462bd05795401e94603aba8470eae5',
            clientSecret: 'c165c82caa414e5d9daa9933aeacc9ad'
        });

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.channel.send('You must be in a voice channel to use this command.');
        }

        const searchQuery = args.join(' ');

        if (!searchQuery) {
            return message.channel.send('Please provide a song to play.');
        }

        const queue = player.createQueue(message.guild, {
            metadata: {
                channel: message.channel,
                connection: null
            }
        });

        try {
            if (!queue.connection) {
                await queue.connect(voiceChannel);
                queue.metadata.connection = queue.connection;
            }
        } catch (error) {
            console.error(`Error connecting to voice channel: ${error}`);
            return message.channel.send('Could not join the voice channel.');
        }

        if (args[0] === 'spotify') {
            const spotifyQuery = args.slice(1).join(' ');

            if (!spotifyQuery) {
                return message.channel.send('Please provide a Spotify search query.');
            }

            spotifyApi.searchTracks(spotifyQuery)
                .then(data => {
                    if (data.body.tracks.items.length === 0) {
                        return message.channel.send('No results found on Spotify.');
                    }

                    const track = data.body.tracks.items[0];
                    const trackUrl = track.external_urls.spotify;

                    const spotifyQueue = new Queue(); 
                    spotifyQueue.push({ trackUrl });

                    spotifyQueue.on('ready', () => {
                        const item = spotifyQueue.peek();
                        if (item) {
                            const ytdl = require('ytdl-core');
                            const stream = ytdl(item.trackUrl, { filter: 'audioonly' });
                        }
                    });

                    spotifyQueue.on('empty', () => {
                    });

                    spotifyQueue.start();

                })
                .catch(error => {
                    console.error(`Error searching Spotify: ${error}`);
                    message.channel.send('Error searching Spotify.');
                });
        } else {
            try {
                await queue.add(searchQuery);
                await queue.play();
            } catch (error) {
                console.error(`Error playing song: ${error}`);
                message.channel.send('Error playing song.');
            }
        }
    }
};
