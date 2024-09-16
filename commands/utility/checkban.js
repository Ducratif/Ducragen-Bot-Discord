const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const axios = require('axios');
const { lien_API, Proposer_Par, Nom_Du_BOT } = require("../../config.js");

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
        .setName("checkban")
        .setDescription("Permets de vérifer si votre API Key est encore valide, banni ou fonctionnel.")
        .addStringOption(option =>
            option.setName('id')
                .setDescription('Veuillez entrer une ID !')
                .setRequired(true)
        ),
    async execute(interaction) {
        let Var_ID = interaction.options.getString("id");
        if (!Var_ID) return interaction.reply("Veuillez fournir une ID correcte !");
    
        const apiUrlGet = `${lien_API}/check_apikey.php/?id_discord=${Var_ID}`;
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
                let embed_gen = new EmbedBuilder()
                    .setAuthor({ name: Nom_Du_BOT + " - Vérifiaction de l'ID Discord" })
                    .setTitle("ID Discord : " + Var_ID + " vérifier !")
                    .setDescription(`${datas.message}`)
                    .setColor(0xff033d)
                    .setTimestamp()
                    //.setImage(DucraGen_Logo)
                    .setFooter({ text: `Proposer par ${Proposer_Par}` });
                await interaction.reply({ embeds: [embed_gen], ephemeral: true});
            }
    }
}