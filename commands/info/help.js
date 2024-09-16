const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { Proposer_Par, Nom_Du_BOT } = require("../../config.js");

module.exports = {
    category: "info",
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Répertorie toutes les commandes ou simplement l'aide pour une commande."),
    async execute(interaction) {
        let embed_help = new EmbedBuilder()
            .setAuthor({ name: "Liste des commandes" })
            .setTitle(Nom_Du_BOT + " - Affiche la Page d'aide")
            .setDescription("**Ceci est une liste de toutes les commandes**")
            .addFields([
                {
                    name: "Permets de générer le service demandé.",
                    value: `**Exemple :**\n \`\`\`[/]gen <Séléctioner le service souhaité>\`\`\``,
                    inline: false
                },
                {
                    name: "Permets de générer le service demandé.",
                    value: `**Exemple :**\n \`\`\`[/]gencoins <Séléctioner le service souhaité>\`\`\``,
                    inline: false
                },
                {
                    name: "Permets de vérifer si votre API Key est encore valide, banni ou fonctionnel.",
                    value: `**Exemple :**\n \`\`\`[/]checkban <ID>\`\`\``,
                    inline: false
                },
                {
                    name: "Permets d'envoyer un message logs API.",
                    value: `**Exemple :**\n \`\`\`[/]logs <Votre message API>\`\`\``,
                    inline: false
                },
                {
                    name: "Permets de voir les services disponible actuelle.",
                    value: `**Exemple :**\n \`\`\`[/]services\`\`\``,
                    inline: true
                },
                {
                    name: "Permets de voir son soldes de points",
                    value: `**Exemple :**\n \`\`\`[/]soldes\`\`\``,
                    inline: true
                },
                {
                    name: "Permets de voir le stocks actuelle.",
                    value: `**Exemple :**\n \`\`\`[/]stocks\`\`\``,
                    inline: true
                },
            ])
            .setColor(0xff033d)
            .setTimestamp()
            //.setImage(DucraGen_Logo)
            .setFooter({ text: `Proposer par ${Proposer_Par}` })
        await interaction.reply({ embeds: [embed_help], ephemeral: false })
    }
}