# Dynamic Google Calendar Favicon (Cloudflare Worker)

Un micro-service "Serverless" développé sur Cloudflare Workers pour afficher une icône dynamique de Google Agenda sur des tableaux de bord personnels (NightTab, Homer, Heimdall, etc.).

## Le problème

La plupart des tableaux de bord personnalisés nécessitent une URL d'image statique pour afficher l'icône (favicon) d'un raccourci. Cependant, l'icône de Google Agenda est dynamique : elle change tous les jours (de 1 à 31) grâce à un script JavaScript exécuté côté client. 
Il est donc impossible d'avoir la bonne date affichée en utilisant une simple URL d'image classique.

## La solution

Ce projet utilise le **Edge Computing** via Cloudflare Workers pour agir comme un relais intelligent et transparent. 

À chaque fois que le tableau de bord tente de charger l'image :
1. Le Worker intercepte la requête.
2. Il calcule la date exacte du jour en forçant le fuseau horaire approprié (ex: `Europe/Paris`) pour éviter les décalages liés aux serveurs internationaux.
3. Il renvoie une **redirection HTTP 302** vers l'image officielle hébergée par Google correspondant au jour actuel.
4. Il injecte des en-têtes stricts (`Cache-Control: no-cache, no-store...`) pour empêcher le navigateur de mettre l'image en cache et garantir que l'icône change bien à minuit.

## Déploiement

1. Créez un Worker sur [Cloudflare](https://workers.cloudflare.com/).
2. Copiez le code du fichier `worker.js` de ce dépôt dans l'éditeur de votre Worker.
3. Déployez le Worker.
4. Copiez l'URL fournie par Cloudflare (ex: `https://votre-worker.sous-domaine.workers.dev`).
5. Collez cette URL dans le champ "Image" ou "Favicon" de votre raccourci sur votre tableau de bord.

## Stack Technique & Compétences

* **Edge Computing / Serverless :** Déploiement de code au plus près de l'utilisateur via Cloudflare Workers.
* **JavaScript :** Logique de calcul de date avec gestion précise des fuseaux horaires (`Intl.DateTimeFormat`).
* **Protocole HTTP :** * Maîtrise des codes de statuts HTTP (Redirection `302 Found`).
  * Manipulation fine des en-têtes HTTP pour la gestion agressive du cache navigateur (`Cache-Control`, `Pragma`, `Expires`).

---
*Projet réalisé pour améliorer l'expérience utilisateur de mon environnement de travail personnel.*