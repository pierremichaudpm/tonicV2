# WORKING_LOG.md

## Session du 13 mars 2026

### Progres realise

#### 1. Mise a jour du logo 21k de Montreal
- Remplacement de `client/public/images/21k-logo.png` (ancien: 223x135px 11Ko -> nouveau: 1127x498px 53Ko)
- Commit `b8d98de` pousse sur main
- Probleme de cache CDN/navigateur sur groupetonic.ca -> resolu par hard refresh

#### 2. Audit de securite complet (lecture seule)
Trois analyses en parallele :
- **Audit .env** : `.env` jamais commite (OK), mais `.env.bak` commite avec mot de passe, et `Axelle20` hardcode dans 5 fichiers
- **npm audit** : 15 vulnerabilites (6 high, 7 moderate, 2 low)
- **Revue server.js** : `new Function()` (code injection), pas de rate limiting, pas de headers securite

#### 3. Corrections de securite (commit `45ddf3b`)
- Retire le mot de passe hardcode `Axelle20` de server.js, restore-jobs.js, test_api.sh
- `ADMIN_PASSWORD` maintenant obligatoire via env var (crash au demarrage si absent)
- Supprime `new Function()` dans `readDataFile` (vecteur d'execution de code arbitraire)
- Ajoute rate limiting sur `/api/cms/login` (5 tentatives / 15 min / IP)
- Retire `.env.bak` du suivi git, ajoute `.env.bak` et `*.bak` au `.gitignore`

#### 4. Durcissement des dependances et headers (commit `d64804c`)
- `npm audit fix` : 15 vulns -> 5 moderate (esbuild dev-only)
- Installe `helmet` pour headers de securite (X-Content-Type-Options, HSTS, X-Frame-Options...)
- CSP et CrossOriginEmbedderPolicy desactives pour compatibilite CMS inline
- Deplace le error handler 413 apres les routes (il ne fonctionnait pas avant)

### Decisions techniques

| Decision | Justification |
|----------|--------------|
| Pas de `npm audit fix --force` | Upgraderait Vite v5->v8 et drizzle-kit, risque de casser le build. Les 5 vulns restantes sont dev-only (esbuild), zero impact en prod |
| CSP desactive dans helmet | Le CMS utilise des scripts/styles inline, activer CSP casserait l'interface admin |
| Rate limiter en memoire (pas de Redis) | Suffisant pour un site a faible trafic, pas de dependance externe supplementaire |
| `process.exit(1)` si pas de ADMIN_PASSWORD | Mieux vaut ne pas demarrer que demarrer avec un mot de passe par defaut |

### Problemes rencontres

1. **Repo git incomplet** dans `Groupe-Tonic-running/` — `.git/` ne contenait que `info/` et `objects/`, pas de HEAD ni refs. Solution: clone depuis GitHub
2. **Auth HTTPS echouee** pour git push — pas de credential helper configure. Solution: switch vers remote SSH (`git@github.com:...`)
3. **Cache CDN/navigateur** pour le logo 21k — le nouveau logo n'apparaissait pas sur groupetonic.ca malgre le push. Resolution: hard refresh cote client
4. **Bref fail au redeploy Railway** — downtime normal pendant le rolling deploy, le site est revenu seul

### Prochaines etapes

1. **Changer le mot de passe admin** dans Railway — `Axelle20` est dans l'historique git (repo prive, mais bonne pratique)
2. **Sanitizer le contenu CMS** — les endpoints de sauvegarde acceptent du HTML brut (risque XSS stocke). Ajouter `sanitize-html` ou DOMPurify cote serveur
3. **Ajouter CORS explicite** — restreindre les origines autorisees au domaine de production
4. **Considerer une session/JWT** — remplacer l'auth par header `x-admin-password` a chaque requete par un token de session
5. **Monitoring** — ajouter un healthcheck endpoint pour Railway et eventuellement un uptime monitor externe
