const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'commands',
    async execute(message) {
        const embed = new MessageEmbed()
            .setTitle('Commands')
            .setDescription('Here are the available commands:')
            .setColor('BLUE')
            .setThumbnail(message.client.user.displayAvatarURL())
            .setFooter('Made with ❤️ by [Your Name]');

        const generalCommands = [
            {
                name: '~ping',
                description: 'Check the bot\'s ping'
            },
            {
                name: '~hello',
                description: 'Say hello to the bot'
            },
            {
                name: '~about',
                description: 'Learn more about the bot'
            },
            {
                name: '~coinflip',
                description: 'Flip a coin'
            },
            {
                name: '~joke',
                description: 'Get a random joke'
            },
            {
                name: '~roast',
                description: 'Get a random roast'
            },
            {
                name: '~rps',
                description: 'Play rock, paper, scissors'
            },
            {
                name: '~msgch',
                description: 'Get the number of messages sent by a user in a channel'
            },
            {
                name: '~msgs',
                description: 'Get the total number of messages sent by a user in the server'
            },
            {
                name: '~music',
                description: 'Play music in a voice channel'
            },
            {
                name: '~clearbot',
                description: 'Clear bot messages in a channel'
            },
            {
                name: '~clearallbot',
                description: 'Clear all bot messages in a channel'
            },
            {
                name: '~clearmsg',
                description: 'Clear messages sent by a user in a channel'
            }
        ];

        const adminCommands = [
            {
                name: '~nuke',
                description: 'Delete a channel and create a new one'
            },
            {
                name: '~timeout',
                description: 'Timeout a user'
            },
            {
                name: '~guildpermissions',
                description: 'Get the bot\'s permissions in the server'
            },
            {
                name: '~ruletheserver',
                description: 'Give a user administrator permissions'
            }
        ];

        const embedFields = [
            {
                name: 'General Commands',
                value: generalCommands.map(command => `~${command.name} - ${command.description}`).join('\n')
            },
            {
                name: 'Admin Commands',
                value: adminCommands.map(command => `~${command.name} - ${command.description}`).join('\n')
            }
        ];

        embed.addFields(embedFields);

        message.channel.send(embed);
    }
};
