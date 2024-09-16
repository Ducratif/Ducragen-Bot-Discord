const { token } = require('../config.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports.registerCommands = async (client, guild) => {
    const rest = new REST({ version: '10' }).setToken(token);
    const body = client.commands.map(command => command.data.toJSON());

    try {
        const data = await rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), { body: body });
        console.log(`Successfully reloaded ${data.length} application (/) commands.`)
    } catch (err) {
        console.log(err);

        if (err.code == 50001) {	
            let embedModal = new EmbedBuilder()
                .setDescription('Commands were not recorded successfully. Please kick the bot from the server and invite it with [this link]')
                .setTimestamp()
                .setFooter({ text: 'Ma Bite'});

            const owner = await guild.fetchOwner()
            owner.send({ embeds: [embedModal] }).catch(() => { })
        }
    }
};