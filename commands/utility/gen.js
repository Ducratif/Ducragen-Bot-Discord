const { lien_API, cles_api, plan, Proposer_Par, Nom_Du_BOT } = require("../../config.js");
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const axios = require('axios');
const Var_abbonnements = [
    { name: "Free", value: "free" },
    { name: "Basique", value: "basique" },
    { name: "Standard", value: "standard" },
    { name: "Premium", value: "premium" },
]

module.exports = {
    category: "utility",
    data: new SlashCommandBuilder()
        .setName("gen")
        .setDescription('Permets de générer le service demandé.')
            .addStringOption(option =>
                option.setName('services')
                .setDescription('Veuillez choisir votre service souhaité dans la liste juste au-dessus ')
                    .setRequired(true)
                    .addChoices(Var_abbonnements)),
    async execute(interaction) {
        const apiUrlGet = `${lien_API}services.php?apikey=${cles_api}`;
        const responses = await axios.get(apiUrlGet);
        const dataa = responses.data;
        if (dataa.success){
            if(plan == "1"){ var services = dataa.Free; }
            else if(plan == "2"){ var services = dataa.Basique; }
            else if(plan == "3"){ var services = dataa.Standard; }
            else if(plan == "4"){ var services = dataa.Premium; }
            else{ return interaction.reply({ content: "Aucun plan selectionner dans le fichier config !" }); }
    
            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId('select_service')
                .setPlaceholder('Sélectionnez un service')
                .addOptions(
                    services.map(service => ({
                            label: service,
                            value: service
                    }))
                );
        
            const row = new ActionRowBuilder().addComponents(selectMenu);
        
            const embed = new EmbedBuilder()
                .setTitle('Services disponibles')
                .setColor('#00FF00')
                .setDescription('Veuillez sélectionner un service dans le menu déroulant ci-dessous.')
                .setTimestamp();
            await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
        
            const filter = i => i.customId === 'select_service' && i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async i => {
                const selectedService = i.values[0];
                const select_service = selectedService;// SERVICE SELECTIONNER !!!

                const apiUrl = `${lien_API}generate.php?apikey=${cles_api}&plangen=${Var_abbonnements}&service=${select_service}`;
                //LANCEMENT DE LA GENERATION
                try {
                    //REQUETE API GENERATION SOLDE
                    const response = await axios.get(apiUrl);
                    const data = response.data;
                    console.log(data);
                    if(data.error){
                        const embed = new EmbedBuilder()
                            .setTitle('**Erreur_T_N°1:**')
                            .setColor('#B50101')
                            .setDescription(`Erreur retourner:\n\`\`\`${data.error}\`\`\``)
                            .setTimestamp();
                        await i.editReply({ content: `<@${userId}>`, embeds: [embed], components: [], ephemeral: false });
                    }
                    if(data.success) {
                        //MESSAGE ENVOYER MAIS CACHER
                        const embedsucess = new EmbedBuilder()
                            .setTitle("Compte " + select_service + " généré !")
                            .setColor('#00FF00')
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
                            .setTimestamp();
                        await i.update({ embeds: [embedsucess], components: [], ephemeral: true });
                    }
                }catch (erreur) {return;} finally {}
            });
            collector.on('end', collected => {
                if (collected.size === 0) {
                    interaction.editReply({ content: 'Aucune sélection reçue dans le temps imparti, commande annulée.', components: [], ephemeral: true });
                }
            });
        }else if (dataa.error) {
            let embed_erreur = new EmbedBuilder()
                .setAuthor({ name: Nom_Du_BOT + " - Erreur" })
                .setTitle("⚠ **__ERREUR__** ⚠")
                .setDescription(`${dataa.error}`)
                .setColor(0xff033d)
                .setTimestamp()
                //.setImage(DucraGen_Logo)
                .setFooter({ text: `Proposer par ${Proposer_Par}` });
            interaction.reply({ embeds: [embed_erreur], ephemoral: false });
        }
    }
}