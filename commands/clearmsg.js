module.exports = {
    name: 'clearmsg',
    async execute(message, args) {
        try {
            const user = message.mentions.users.first();
            const deleteCount = parseInt(args[1], 10);

            if (!user) {
                return message.channel.send('Please mention a user whose messages you want to delete.');
            }

            if (isNaN(deleteCount) || deleteCount <= 0) {
                return message.channel.send('Please provide a valid number of messages to delete.');
            }

            const fetchedMessages = await message.channel.messages.fetch({ limit: 100 });
            const userMessages =
