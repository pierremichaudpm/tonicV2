# CLAUDE.md

## Projet : Groupe Tonic Website (tonicV2)

Site web multilingue (FR/EN) pour Groupe Tonic, entreprise de gestion d'evenements sportifs au Quebec.

### Stack
- **Frontend** : HTML/JS statique servi par Express (client/public/)
- **Backend** : Express.js (server.js, ~800 lignes)
- **CMS** : Integre dans server.js, donnees stockees en fichiers .js dans DATA_DIR
- **Hebergement** : Railway (service + volume persistant `/data`)
- **Domaine** : groupetonic.ca (pointe vers Railway)
- **Repo** : github.com/pierremichaudpm/tonicV2 (prive, SSH)

### Architecture
- `server.js` : Serveur Express monolithique (API CMS, traduction, backup, static files)
- `client/public/` : Frontend statique (HTML, CSS, JS, images)
- `client/public/js/` : Fichiers de donnees CMS (emplois, communiques, heroes)
- `DATA_DIR` : Variable d'env pointant vers le volume Railway (`/data`) pour persistance CMS

### Variables d'environnement (Railway)
- `ADMIN_PASSWORD` : Obligatoire, le serveur refuse de demarrer sans
- `ANTHROPIC_API_KEY` : Pour la traduction automatique FR->EN
- `DATA_DIR=/data` : Volume persistant Railway
- `NODE_ENV=production`

### Contraintes importantes
- **NE JAMAIS** supprimer le volume Railway `tonicV2-volume`
- **NE JAMAIS** retirer `DATA_DIR` des variables Railway
- Le CMS ecrit des fichiers .js (pas du JSON pur) — format `const varName = [...]`
- `package-lock.json` est dans `.gitignore` — Railway fait `npm install` a chaque deploy
- Les 5 vulnerabilites npm restantes sont dans esbuild (dev-only, pas en prod)

### Securite en place
- `ADMIN_PASSWORD` requis via env var (pas de fallback hardcode)
- Rate limiting sur `/api/cms/login` (5 tentatives / 15 min / IP)
- `helmet` pour les headers de securite (CSP desactive pour le CMS inline)
- Plus de `new Function()` dans `readDataFile` (JSON.parse uniquement)
- `.env.bak` retire du repo et ignore

### Commandes utiles
```bash
npm run dev          # Lancer en local (port 3000)
npm run backup:cms   # Backup manuel des donnees CMS
npm run test:api     # Tests API (necessite ADMIN_PASSWORD env var)
```

### Deploiement
- Push sur `main` -> Railway redeploy automatique
- Remote SSH : `git@github.com:pierremichaudpm/tonicV2.git`
- Bref downtime normal pendant le redeploy (~10-30s)
