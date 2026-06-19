# Swanne. — Guide d'hébergement et d'installation

Ce dossier contient une **application web installable** (PWA). Une fois mise en ligne, elle s'installe sur le téléphone comme une vraie appli (icône, plein écran, fonctionne hors-ligne) **sans passer par le Play Store**.

---

## 1. Ce que contient le dossier

- `index.html` — l'application
- `manifest.webmanifest` — la fiche d'identité de l'app (nom, icône, couleurs)
- `sw.js` — le « service worker » : il fait fonctionner l'app hors-ligne et gère les mises à jour
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` — les icônes
- `GUIDE.md` — ce guide

> Important : ces fichiers doivent rester **ensemble dans le même dossier**, à la racine du site.

---

## 2. Mettre l'app en ligne (gratuit)

Il faut une adresse en **HTTPS** : c'est obligatoire pour qu'une PWA soit installable et fonctionne hors-ligne. Les deux solutions ci-dessous le font gratuitement.

### Option A — Netlify Drop (le plus simple, sans compte technique)

1. Aller sur **https://app.netlify.com/drop**
2. Faire glisser **tout le dossier `swanne-app`** dans la zone indiquée (ou cliquer pour le sélectionner).
3. Attendre quelques secondes : Netlify affiche une adresse du type `https://nom-aleatoire.netlify.app`.
4. C'est en ligne. Cette adresse est votre application.

> Pour garder l'adresse de façon permanente et pouvoir la mettre à jour facilement, créez un compte gratuit Netlify (avec votre email) quand il vous le propose. Vous pourrez aussi renommer l'adresse (ex. `reperes-marie.netlify.app`).

### Option B — GitHub Pages (si vous préférez GitHub)

1. Créer un compte sur **github.com**, puis un nouveau dépôt (« New repository »), par exemple `reperes`.
2. Cliquer **Add file → Upload files**, déposer tous les fichiers du dossier, puis **Commit**.
3. Aller dans **Settings → Pages**, choisir la branche `main` et le dossier `/ (root)`, puis **Save**.
4. Au bout d'une minute, l'adresse apparaît : `https://votre-pseudo.github.io/reperes/`.

---

## 3. Installer l'app sur le téléphone (Android)

1. Ouvrir l'adresse du site dans **Chrome** sur le téléphone.
2. Toucher le menu **⋮** (trois points en haut à droite).
3. Choisir **« Installer l'application »** (ou « Ajouter à l'écran d'accueil »).
4. Confirmer. Une icône **Swanne.** apparaît sur l'écran d'accueil.
5. L'ouvrir : elle se lance en plein écran, comme une vraie appli.

> Astuce : après l'avoir installée, ouvrez-la **une fois en étant connecté** à Internet. Elle se met alors en cache et fonctionnera ensuite **hors-ligne**.

### Vérifier que le hors-ligne marche
Activez le mode avion, puis ouvrez l'appli depuis l'icône : elle doit s'ouvrir et fonctionner normalement (la saisie, le suivi, etc.). Seuls les graphiques restent disponibles car tout est embarqué ; les polices d'écriture peuvent juste être un peu différentes hors-ligne.

---

## 4. Sauvegarder les données

Tout reste **sur le téléphone**. Pour ne rien perdre (changement d'appareil, nettoyage…), pensez à exporter régulièrement :

1. Dans l'appli : onglet **Mon suivi → Récapitulatif**, en bas → **« Sauvegarder mes données »**.
2. Le partage du téléphone s'ouvre : choisissez **Google Drive** (ou un mail à vous-même, l'app Fichiers…).
3. Pour restaurer sur un nouveau téléphone : installez l'app, puis **« Restaurer »** et choisissez le fichier.

Un rappel discret apparaît dans l'app si la dernière sauvegarde date de plus de 3 semaines.

> La sauvegarde **vraiment automatique** vers Drive (sans avoir à toucher quoi que ce soit) viendra à l'étape suivante : elle demande de connecter l'app à Google une seule fois. On la mettra en place une fois le site en ligne.

---

## 5. Les mises à jour (pour la suite, ensemble)

Quand on améliorera l'appli, je vous donnerai un **nouveau `index.html`** (et parfois un `sw.js` mis à jour). Pour déployer la mise à jour :

- **Sur Netlify** : retournez sur votre projet → onglet **Deploys** → faites glisser le dossier mis à jour. (Ou si vous avez gardé Netlify Drop, redéposez le dossier.)
- **Sur GitHub** : **Upload files** par-dessus les anciens, puis **Commit**.

Côté téléphone, **rien à faire** : à la prochaine ouverture (connectée à Internet), l'app récupère la nouvelle version toute seule. **Vos données ne sont jamais touchées** par une mise à jour.

> Détail technique : quand un fichier change, je modifie aussi le numéro de version dans `sw.js` (la ligne `const CACHE = "reperes-v1"` → `"reperes-v2"`, etc.). C'est ce qui force le rafraîchissement propre du cache. Je m'en occupe à chaque fois.

---

## 6. La suite prévue

1. ✅ **Maintenant** : app hébergée, installable sur Android, hors-ligne, sauvegarde en un tap.
2. **Ensuite** : connexion Google Drive pour une sauvegarde **automatique** (autorisation unique, accès limité aux seuls fichiers créés par l'app).
3. **Plus tard, si utile** : chiffrement des données par mot de passe, puis éventuellement publication sur les stores.

---

## Note pour iPhone (pour mémoire)

Sur iPhone, l'installation se fait via **Safari → Partager → « Sur l'écran d'accueil »**. L'app fonctionne, mais la sauvegarde automatique vers un dossier n'est pas permise par iOS : on reste sur le partage manuel. Pour l'instant ce n'est pas un sujet, l'appareil visé étant Android.
