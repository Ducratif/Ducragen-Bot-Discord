const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const axios = require('axios');
const { lien_API, cles_api, Proposer_Par, Nom_Du_BOT } = require("../../config.js");

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
        .setName("services")
        .setDescription("Permets de voir les services disponible actuelle."),
    async execute(interaction) {
        axios.get(`${lien_API}/services.php/?apikey=${cles_api}`)
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
                let embed_success_1 = new EmbedBuilder()
                    .setAuthor({ name: Nom_Du_BOT + " - Notre services Disponibles" })
                    .setTitle("**__Services Total Disponnible__**")
                    .addFields([
                        {
                            name: "Standard :",
                            value: `\`\`\`${data.Standard.join('\n')}\`\`\``,
                            inline: true
                        },
                        {
                            name: "Basique :",
                            value: `\`\`\`${data.Basique.join('\n')}\`\`\``,
                            inline: false
                        },
                    ])
                    .setColor(0xff033d)
                    .setTimestamp()
                    //.setImage(DucraGen_Logo)
                    .setFooter({ text: `Proposer par ${Proposer_Par}` });
    
                    let embed_success_2 = new EmbedBuilder()
                    .setAuthor({ name: Nom_Du_BOT + " - Notre services Disponibles" })
                    .setTitle("**__Services Total Disponnible__**")
                    .addFields([
                        {
                            name: "Premium :",
                            value: `\`\`\`${data.Premium.join('\n')}\`\`\``,
                            inline: true
                        },
                        {
                            name: "Free :",
                            value: `\`\`\`${data.Free.join('\n')}\`\`\``,
                            inline: false
                        },
                    ])
                    .setColor(0xff033d)
                    .setTimestamp()
                    //.setImage(DucraGen_Logo)
                    .setFooter({ text: `Proposer par ${Proposer_Par}` });
                interaction.reply({ embeds: [embed_success_1, embed_success_2], ephemoral: false })
            }
        });
    }
}