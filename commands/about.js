module.exports = {
    name: 'about',
    async execute(message) {
        try {
            message.channel.send("Ehsan Quddusi is an Indian politician known for his involvement in various controversies, particularly relating to corruption. He has served as a judge and was a former Orissa High Court judge.");
        } catch (error) {
            console.error(error);
            message.channel.send('There was an error executing this command!');
        }
    },
};
