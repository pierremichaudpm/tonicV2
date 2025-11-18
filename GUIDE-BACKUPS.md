# 📦 Guide des Backups CMS - Groupe Tonic

## 🎯 Protection automatique ACTIVE

Votre site est maintenant **protégé automatiquement** :

### ✅ Backup automatique à chaque redéploiement
- **Quand :** À chaque fois que Railway redéploie votre site
- **Quoi :** Tous les contenus CMS (communiqués, emplois, événements)
- **Où :** Volume Railway `/data/../cms_backups/startup_YYYY-MM-DD...`

### ✅ Bouton de backup manuel dans le CMS
- **Où :** En haut à droite du CMS, bouton vert "💾 Backup"
- **Quand l'utiliser :** Avant de faire des modifications importantes
- **Résultat :** Sauvegarde instantanée de toutes les données

## 🔴 Quand créer un backup manuel ?

**TOUJOURS avant de :**
1. Modifier plusieurs communiqués d'un coup
2. Supprimer du contenu
3. Faire des changements importants aux événements
4. Tester de nouvelles fonctionnalités

**Comment :**
1. Allez sur https://www.groupetonic.ca/cms
2. Connectez-vous
3. Cliquez sur le bouton vert "💾 Backup" en haut à droite
4. Attendez le message de confirmation

## 🚨 En cas de perte de données

### Option 1 : Restauration automatique (la plus simple)

Si vos données sont perdues après un redéploiement:

1. Ouvrez votre navigateur
2. Entrez cette URL:
   ```
   https://www.groupetonic.ca/api/cms/emergency-restore
   ```
3. Cliquez sur le bouton "POST" ou utilisez curl:
   ```bash
   curl -X POST https://www.groupetonic.ca/api/cms/emergency-restore \
     -H "x-admin-password: Axelle20"
   ```
4. Rafraîchissez votre site

**Cela restaure:** Le dernier backup intégré dans le code Git

### Option 2 : Restauration depuis un backup spécifique

Si vous avez accès au serveur Railway:

1. Connectez-vous à Railway
2. Allez dans les logs du déploiement actif
3. Cherchez les lignes `[STARTUP] Auto-backup: ...`
4. Les backups sont dans `/data/../cms_backups/`

## 🛡️ Protections en place

### 1. Plus de CDN Tailwind externe ✅
- **Avant:** Le site chargeait Tailwind depuis un CDN externe
- **Problème:** Le CDN pouvait être mis à jour et casser le site
- **Maintenant:** CSS 100% local, aucune dépendance externe
- **Résultat:** Impossible qu'une mise à jour externe casse le site

### 2. Volume Railway persistant ✅
- **Configuration:** `DATA_DIR=/data` + Volume monté
- **Résultat:** Les modifications CMS ne sont PLUS perdues au redéploiement
- **Important:** NE JAMAIS supprimer la variable `DATA_DIR` ou le volume Railway

### 3. Backups multiples ✅
- **Au démarrage:** Backup automatique
- **Manuel CMS:** Bouton vert dans l'interface
- **API:** Endpoint `/api/cms/backup`
- **Rétention:** 30 derniers backups conservés

## 📊 Vérifier que tout fonctionne

**Après un redéploiement:**

1. **Site principal:** https://www.groupetonic.ca/
   - Les countdowns fonctionnent?
   - Les images ne sont pas distordues?
   - Les overlays de couleur sont présents?

2. **Communiqués:** https://www.groupetonic.ca/communiques
   - Tous les communiqués sont là?
   - Les catégories sont correctes?
   - Les images sont bonnes?

3. **Emplois:** https://www.groupetonic.ca/emplois
   - Les 3 offres sont visibles?

4. **CMS:** https://www.groupetonic.ca/cms
   - Vous pouvez sauvegarder?
   - La traduction automatique fonctionne?

## ⚠️ RÈGLES D'OR

### ❌ NE JAMAIS FAIRE:
1. Supprimer la variable `DATA_DIR` dans Railway
2. Supprimer ou recréer le volume `tonicV2-volume`
3. Ajouter un CDN externe (Tailwind, Bootstrap, etc.) dans `index.html`

### ✅ TOUJOURS FAIRE:
1. Créer un backup avant modifications importantes
2. Vérifier le site après un redéploiement
3. Garder le backup du 2 septembre en sécurité locale

## 🆘 Contacts en cas de problème

Si quelque chose ne va pas:
1. Créez un backup immédiatement (bouton vert CMS)
2. Appelez l'endpoint d'urgence
3. Contactez le développeur si le problème persiste

## 📅 Dernière mise à jour

**18 novembre 2025** - Système de protection complet mis en place
- CDN Tailwind retiré
- Volume Railway configuré
- Backups automatiques activés
- Endpoint d'urgence créé

