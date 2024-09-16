const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const axios = require('axios');
const { lien_API, cles_api, Proposer_Par, Nom_Du_BOT } = require("../../config.js");
const Var_abbonnements = [
    { name: "Free", value: "free" },
    { name: "Basique", value: "basique" },
    { name: "Standard", value: "standard" },
    { name: "Premium", value: "premium" },
]

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
        .setName("servicesplan")
        .setDescription("Permets de voir les services disponible actuelle par plan choisie.")
        .addStringOption(option =>
            option.setName('services')
                .setDescription('Veuillez choisir votre service souhaité dans la liste juste au-dessus !')
                .addChoices(Var_abbonnements)
                .setRequired(true)
        ),
    async execute(interaction) {
        let abbo = interaction.options.getString("services");
        if (!abbo) return interaction.reply("Veuillez fournir un services !");
        axios.get(`${lien_API}/services_plan.php/?apikey=${cles_api}&planname=${abbo}`)
        .then(response => {
            let data = response.data;
            let var_plan = data.plan;
            let var_services = data.services;
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
                let embed_success = new EmbedBuilder()
                    .setAuthor({ name: Nom_Du_BOT + " - Notre services Disponibles" })
                    .setTitle(`**__Services Disponnible pour ${var_plan}__**`)
                    .addFields([
                        {
                            name: "Basique :",
                            value: `\`\`\`${var_services.join('\n')}\`\`\``,
                            inline: false
                        },
                    ])
                    .setColor(0xff033d)
                    .setTimestamp()
                    //.setImage(DucraGen_Logo)
                    .setFooter({ text: `Proposer par ${Proposer_Par}` });
                interaction.reply({ embeds: [embed_success], ephemoral: false })
            }
        });
    }
}