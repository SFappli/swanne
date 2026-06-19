# Connecter Swanne. à Google Drive (sauvegarde automatique)

Cette étape permet à l'app d'envoyer **automatiquement** sa sauvegarde dans votre Google Drive. L'app n'accède **qu'au fichier de sauvegarde qu'elle crée** — jamais au reste de votre Drive.

Ça se fait en deux temps : d'abord créer une « autorisation » chez Google (≈ 10 min, une seule fois), puis la coller dans l'app.

> Pré-requis : l'app doit être **en ligne** (adresse `https://…`) et installée depuis cette adresse. ✔️ C'est votre cas.

---

## Partie 1 — Créer l'autorisation chez Google (une seule fois)

1. Allez sur **https://console.cloud.google.com** et connectez-vous avec le **compte Google dont vous voulez utiliser le Drive** (par ex. celui de votre femme).

2. En haut, créez un projet : **« Sélectionner un projet » → Nouveau projet** → nom : `Reperes` → **Créer**. Sélectionnez-le ensuite.

3. Activez l'API Drive : barre de recherche en haut → tapez **« Google Drive API »** → ouvrez-la → **Activer**.

4. Configurez l'écran de consentement : menu (☰) → **API et services → Écran de consentement OAuth**.
   - Type d'utilisateur : **Externe** → **Créer**.
   - Nom de l'application : `Swanne.` ; e-mail d'assistance : votre adresse ; coordonnées du développeur : votre adresse. **Enregistrer et continuer**.
   - Étape « Niveaux d'accès » : vous pouvez passer (**Enregistrer et continuer**).
   - Étape **« Utilisateurs tests »** : cliquez **Ajouter des utilisateurs** et mettez l'**adresse Gmail qui utilisera l'app** (celle de votre femme, et la vôtre si besoin). **Enregistrer et continuer**.
   - Laissez l'état de publication sur **« Test »** (c'est suffisant pour un usage personnel).

5. Créez l'identifiant : menu → **API et services → Identifiants** → **Créer des identifiants → ID client OAuth**.
   - Type d'application : **Application Web**.
   - Nom : `Swanne. Web`.
   - **Origines JavaScript autorisées → Ajouter un URI** : collez **l'adresse exacte de votre app**, par exemple `https://reperes-xxxx.netlify.app`
     - ⚠️ Sans barre `/` à la fin, sans chemin. Juste `https://votre-adresse`.
   - **Créer**.

6. Une fenêtre affiche votre **ID client** (il finit par `…apps.googleusercontent.com`). **Copiez-le.**

---

## Partie 2 — Brancher l'app

1. Ouvrez Swanne. → icône **réglages** (les curseurs, en haut à droite) → carte **« Sauvegarde Google Drive »**.
2. **Collez l'ID client** dans le champ, puis **« Connecter Google Drive »**.
3. Une fenêtre Google s'ouvre : choisissez le compte (celui ajouté en utilisateur test).
4. Un écran **« Google n'a pas validé cette application »** apparaît : c'est normal en mode Test. Touchez **« Paramètres avancés »** puis **« Accéder à Swanne. (non sécurisé) »** — c'est sans risque, c'est votre propre application.
5. Autorisez l'accès. L'app fait aussitôt une **première sauvegarde** et active la **sauvegarde automatique**.

C'est terminé. Désormais, à chaque fois que vous enregistrez une journée, la sauvegarde part toute seule dans votre Drive (vous y trouverez un fichier `reperes-sauvegarde.json`).

---

## Bon à savoir

- **Sécurité** : l'app utilise la permission la plus restreinte (`drive.file`) — elle ne voit **que** son propre fichier de sauvegarde, rien d'autre dans votre Drive. Votre mot de passe Google n'est jamais vu par l'app.
- **L'avertissement « non validée »** vient du mode Test (jusqu'à 100 utilisateurs autorisés). Pour un usage perso/familial, c'est parfait. Si un jour vous diffusez largement l'app, on pourra demander la validation Google pour faire disparaître cet écran.
- **Si la sauvegarde auto se met en pause** (Google redemande parfois l'autorisation après un long moment) : ouvrez les réglages → **« Sauvegarder maintenant »**, ce qui ré-autorise en un clic.
- **Filet de sécurité** : le bouton **« Sauvegarder mes données »** (partage manuel) reste disponible et fonctionne sans Drive.
- **Hors-ligne** : la sauvegarde Drive a besoin d'Internet ; hors connexion, les données restent évidemment enregistrées sur l'appareil et repartiront vers Drive au prochain enregistrement connecté.

---

## Important : redéployer la nouvelle version

Cette fonctionnalité est dans la **nouvelle version** de `index.html` (et `sw.js` mis à jour). Pensez à **redéposer les fichiers** sur votre hébergeur (Netlify / GitHub). Sur le téléphone, la mise à jour s'appliquera toute seule à la prochaine ouverture connectée.
