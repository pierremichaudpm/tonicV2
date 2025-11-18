# 🛡️ Protection du site et des données CMS

## Problèmes résolus

### 1. ✅ Protection contre les mises à jour externes (CDN Tailwind)

**Problème:** Le site chargeait `https://cdn.tailwindcss.com` qui peut être mis à jour à tout moment et écraser vos styles custom.

**Solution appliquée:**
- Retiré le CDN Tailwind de `index.html`
- Le site utilise maintenant uniquement `tailwind-production.css` (version locale stable)
- **RÉSULTAT:** Les styles ne changeront plus jamais à cause d'une mise à jour externe

### 2. ✅ Protection des données CMS (Volume Railway)

**Configuration actuelle:**
- Volume Railway: `tonicV2-volume` monté sur `/data`
- Variable d'environnement: `DATA_DIR=/data`
- **RÉSULTAT:** Les modifications CMS sont sauvegardées sur un volume persistant

### 3. ✅ Système de backup automatique

**Commande manuelle:**
```bash
npm run backup:cms
```

**Endpoint API:**
```bash
curl -X POST https://www.groupetonic.ca/api/cms/backup \
  -H "x-admin-password: VotreMotDePasse"
```

**Backups créés dans:** `cms_backups/backup_YYYY-MM-DDTHH-MM-SS/`

**Rétention:** Les 30 derniers backups sont conservés automatiquement

## 📋 Bonnes pratiques

### ✅ AVANT de modifier dans le CMS:

1. **Créer un backup manuel:**
   ```bash
   npm run backup:cms
   ```
   
2. **Ou via le CMS:** Ajoutez un bouton "Créer un backup" (je peux le coder)

### ✅ APRÈS un redéploiement Railway:

1. Vérifier que le site fonctionne: https://www.groupetonic.ca/
2. Vérifier que les communiqués sont là: https://www.groupetonic.ca/communiques
3. Vérifier que les emplois sont là: https://www.groupetonic.ca/emplois

### ✅ SI quelque chose est perdu:

1. **Endpoint d'urgence:**
   ```bash
   curl -X POST https://www.groupetonic.ca/api/cms/emergency-restore \
     -H "x-admin-password: VotreMotDePasse"
   ```

2. **Restaurer depuis un backup spécifique:**
   - Allez dans `cms_backups/`
   - Trouvez le backup voulu
   - Copiez les fichiers vers le repo
   - Utilisez l'endpoint d'urgence

## 🔒 Configuration Railway - À NE JAMAIS TOUCHER

**Variables (tonicV2 service):**
- ✅ `DATA_DIR=/data` (NE PAS SUPPRIMER)
- ✅ `ADMIN_PASSWORD=...` (pour le CMS)
- ✅ `ANTHROPIC_API_KEY=...` (pour traduction auto)

**Volume (tonicV2-volume):**
- ✅ Mount Path: `/data`
- ✅ Attaché au service tonicV2
- ⚠️ **NE JAMAIS SUPPRIMER OU RECRÉER CE VOLUME**

## 📊 Que faire si le volume est perdu/corrompu?

1. Appelez l'endpoint d'urgence (restaure le dernier backup intégré au code)
2. Ou utilisez un backup manuel de `cms_backups/`

## 🚨 Backups recommandés

**Fréquence suggérée:**
- **Quotidien:** Backup automatique (je peux configurer un cron)
- **Avant modification importante:** Backup manuel
- **Avant redéploiement:** Backup manuel

## 📝 Fichiers à ne JAMAIS commit dans Git

Déjà configuré dans `.railwayignore`:
- `cms_backups/` (backups locaux)
- `cms_backup_*/` (anciens backups)
- Fichiers temporaires


