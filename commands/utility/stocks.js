const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const axios = require('axios');
const { lien_API, cles_api, Proposer_Par, Nom_Du_BOT } = require("../../config.js");

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
        .setName("stocks")
        .setDescription("Permets de voir le stocks actuelle."),
    async execute(interaction) {
        axios.get(`${lien_API}/stock.php/?apikey=${cles_api}`)
        .then(response => {
            let data = response.data;
            //console.log(data);
            if (data.error) {
                let embed_erreur = new EmbedBuilder()
                    .setAuthor({ name: Nom_Du_BOT + " - Erreur" })
                    .setTitle("⚠ **__ERREUR__** ⚠")
                    .setDescription(`${data.error}`)
                    .setColor(0xff033d)
                    .setTimestamp()
                    //.setImage(DucraGen_Logo)
                    .setFooter({ text: `Proposer par ${Proposer_Par}` });
                interaction.reply({ embeds: [embed_erreur], ephemoral: false })
            }
            if (data.success) {
                let embed_erreur = new EmbedBuilder()
                    .setAuthor({ name: Nom_Du_BOT + " - Notre stocks de nos services" })
                    .setTitle("**__Stocks Total__**" + `\`\`\`${data.total}\`\`\``)
                    .setDescription(`\`\`\`${data.disponible.join("\n")}\`\`\``)
                    .setColor(0xff033d)
                    .setTimestamp()
                    //.setImage(DucraGen_Logo)
                    .setFooter({ text: `Proposer par ${Proposer_Par}` });
                interaction.reply({ embeds: [embed_erreur], ephemoral: false })
            }
        });
    }
}