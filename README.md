# DucraGen OpenSource Bot

Bienvenue dans **DucraGen OpenSource**, un bot Discord open-source développé en **NodeJS** permettant d'utiliser les services de **DucraGen** directement depuis Discord. Ce bot est conçu pour vous offrir une expérience rapide et fluide en interagissant avec les API de DucraGen.

Documentation: https://doc.ducragen.com/api-ducragen/bot-discord

## Fonctionnalités

Le bot **DucraGen OpenSource** vous permet d'utiliser plusieurs services liés à DucraGen avec des commandes simples. Voici la liste des commandes disponibles :

### Commandes
- **`[/]gen <Sélectionner le service souhaité>`** : Générer un service spécifique.
- **`[/]gencoins <Sélectionner le service souhaité>`** : Générer des coins pour un service.
- **`[/]checkban <ID>`** : Vérifier si un ID est banni.
- **`[/]logs <Votre message API>`** : Ajouter des logs à propos d'une action utilisateur.
- **`[/]services`** : Voir la liste des services disponibles.
- **`[/]soldes`** : Vérifier le solde de coins de l'utilisateur.
- **`[/]stocks`** : Voir le stock des services disponibles.

## Configuration

Avant de démarrer le bot, vous devrez configurer certains paramètres dans le fichier `config.js`. Voici comment le fichier `config.js` doit être configuré :

```javascript
module.exports = {
	token: 'TOKEN', // Mettre le token de votre Bot.
	prefix: '!', // Le préfixe pour les commandes de votre bot.
	id_bot: "ID_BOT", // Mettre l'ID de votre Bot.
	cles_api: "CLES_API", // Mettre votre clé API DucraGen.
	lien_API: "https://api.ducragen.com/", // Lien de l'API DucraGen.
	abbonements: "premium", // Choisissez entre "free", "basique", "standard", "premium".
	plan: "1", // Plan associé à l'abonnement.
	Nom_Du_BOT: "DucraGen OpenSource", // Nom du bot.
	Proposer_Par: "DucraGen OpenSource", // Propriétaire ou source du bot.
	ServeurID: "ID_SERVEUR", // Mettre l'ID de votre serveur où se situe votre bot.
};
```

### Étapes d'installation

1. **Cloner le repository :**

   ```bash
   git clone https://github.com/votre-utilisateur/ducragen-bot.git
   cd ducragen-bot
   ```

2. **Installer les dépendances :**

   Utilisez `npm` pour installer les dépendances nécessaires :

   ```bash
   npm install
   ```

3. **Configurer le bot :**

   Modifiez le fichier `config.js` pour y ajouter vos informations personnelles et celles de votre bot.

4. **Lancer le bot :**

   Une fois configuré, vous pouvez démarrer votre bot avec la commande suivante :

   ```bash
   node index.js
   ```

5. **Inviter le bot sur votre serveur :**

   Créez un lien d'invitation pour ajouter le bot à votre serveur Discord, en remplaçant `YOUR_BOT_ID` par l'ID de votre bot :

   ```url
   https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot&permissions=8
   ```

## Contributions

Les contributions sont les bienvenues ! Si vous souhaitez ajouter de nouvelles fonctionnalités, corriger des bugs ou améliorer le code, n'hésitez pas à soumettre une **pull request**.

## Licence

Ce projet est open-source et sous licence [MIT](LICENSE).
