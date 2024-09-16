const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const axios = require('axios');
const { lien_API, cles_api, Proposer_Par, Nom_Du_BOT } = require("../../config.js");

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
        .setName("logs")
        .setDescription("Permets d'envoyer un message logs API..")
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Veuillez saisir votre message logs API !')
                .setRequired(true)
        ),
    async execute(interaction) {
        let MSG_LOGS = interaction.options.getString("message");
        if (!MSG_LOGS) return interaction.reply("Veuillez saisir votre message logs API !");
    
        const apiUrlGet = `${lien_API}logs.php/?apikey=${cles_api}&message=${MSG_LOGS}`;
        const responses = await axios.get(apiUrlGet);
        const datas = responses.data;
            //console.log(datas);
            if (datas.error) {
                let embed_erreur = new EmbedBuilder()
                    .setAuthor({ name: Nom_Du_BOT + " - Erreur" })
                    .setTitle("⚠ **__ERREUR__** ⚠")
                    .setDescription(`${datas.error}`)
                    .setColor(0xff033d)
                    .setTimestamp()
                    //.setImage(DucraGen_Logo)
                    .setFooter({ text: `Proposer par ${Proposer_Par}` });
                interaction.reply({ embeds: [embed_erreur], ephemoral: false });
            }
            if (datas.success) {
                let embed_success = new EmbedBuilder()
                    .setAuthor({ name: Nom_Du_BOT + " - Logs Message API" })
                    .addFields([
                        {
                            name: "Logs Message API ajouter :",
                            value: `\`\`\`${datas.success}\`\`\``,
                            inline: false
                        },
                        {
                            name: "Message API saisie :",
                            value: `\`\`\`${MSG_LOGS}\`\`\``,
                            inline: false
                        },
                        ])
                    .setColor(0xff033d)
                    .setTimestamp()
                    //.setImage(DucraGen_Logo)
                    .setFooter({ text: `Proposer par ${Proposer_Par}` });
                // Confirme dans le canal d'origine que le message a été envoyé
                interaction.reply({ embeds: [embed_success], ephemeral: true})
            }
    }
}