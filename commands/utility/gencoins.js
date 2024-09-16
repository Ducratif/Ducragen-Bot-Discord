const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const axios = require('axios');
const { cles_api, lien_API, Proposer_Par, Nom_Du_BOT } = require("../../config.js");
const Var_services = [
    { name: "Spotify", value: "collection_spotify" },
    { name: "Netflix", value: "collection_netflix" },
    { name: "Disney", value: "collection_disney" },
]

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
        .setName("gencoins")
        .setDescription("Permets de générer le service demandé.")
        .addStringOption(option =>
            option.setName('services')
                .setDescription('Veuillez choisir votre service souhaité dans la liste juste au-dessus !')
                .addChoices(Var_services)
                .setRequired(true)
        ),
    async execute(interaction) {
    /*let service = interaction.options.getString("Var_services");
    if (!service) return interaction.reply("Veuillez fournir un services !");*/
    const services = Var_services != "collection_spotify" && "collection_netflix" && "collection_disney";

    const apiUrlGet = `${lien_API}/generate_solde.php/?apikey=${cles_api}&service=${services}`;
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
                //.setImage(config.JPEG_DucraGen)
                .setFooter({ text: `Proposer par ${Proposer_Par}` });
            interaction.reply({ embeds: [embed_erreur], ephemoral: false });
        }

        if (datas.success) {
            let embed_gen = new EmbedBuilder()
                .setAuthor({ name: Nom_Du_BOT + " - Générateur de compte" })
                .setTitle("Compte " + services + " généré !")
                .addFields([
                    {
                        name: "Mail :",
                        value: `\`\`\`${datas.email}\`\`\``,
                        inline: true
                    },
                    {
                        name: "Mot de passe :",
                        value: `\`\`\`${datas.password}\`\`\``,
                        inline: true
                    },
                    {
                        name: "Coins Déduit :",
                        value: `\`\`\`${datas.coins}\`\`\``,
                        inline: true
                    },
                    {
                        name: "Coins Avant Déduction :",
                        value: `\`\`\`${datas.before_coins}\`\`\``,
                        inline: true
                    },
                    {
                        name: "Coins Après Déduction :",
                        value: `\`\`\`${datas.after_coins}\`\`\``,
                        inline: true
                    },
                ])
                .setColor(0xff033d)
                .setTimestamp()
                //.setImage(config.JPEG_DucraGen)
                .setFooter({ text: `Proposer par ${Proposer_Par}` });
            await interaction.reply({ embeds: [embed_gen], ephemeral: true});
        }
    }
}