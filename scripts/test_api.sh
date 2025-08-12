#!/usr/bin/env bash
set -euo pipefail

# Config
BASE_URL=${BASE_URL:-http://localhost:3000}
ADMIN_PASSWORD=${ADMIN_PASSWORD:-Axelle20}

echo "=== Tests API Groupe Tonic (${BASE_URL}) ==="

tmp_dir="/tmp/gt_api_test"
mkdir -p "${tmp_dir}"

pass() { echo -e "[OK] $1"; }
fail() { echo -e "[FAIL] $1"; exit 1; }

echo "\n-- Login CMS --"
login_resp=$(curl -sS "${BASE_URL}/api/cms/login" \
  -H 'Content-Type: application/json' \
  -d '{"password":"'"${ADMIN_PASSWORD}"'"}' || true)
echo "${login_resp}" | grep -q '"success":true' && pass "Login CMS" || fail "Login CMS"

echo "\n-- Lire communiqués FR --"
curl -sS "${BASE_URL}/api/cms/content/news/fr" -H "x-admin-password: ${ADMIN_PASSWORD}" \
  -o "${tmp_dir}/news_fr.json"
test -s "${tmp_dir}/news_fr.json" && pass "Lecture communiqués FR" || fail "Lecture communiqués FR"

echo "\n-- Traduction FR -> EN --"
trans_fr_en=$(curl -sS "${BASE_URL}/api/translate" \
  -H "x-admin-password: ${ADMIN_PASSWORD}" \
  -H 'Content-Type: application/json' \
  -d '{"text":"Bonjour le monde","fromLang":"fr","toLang":"en"}')
echo "${trans_fr_en}" | grep -q 'Translated using Claude API' && pass "FR->EN" || echo "[WARN] FR->EN: ${trans_fr_en}"

echo "\n-- Traduction EN -> FR (doit être refusé) --"
status=$(curl -sS -o "${tmp_dir}/en_fr.json" -w "%{http_code}" "${BASE_URL}/api/translate" \
  -H "x-admin-password: ${ADMIN_PASSWORD}" \
  -H 'Content-Type: application/json' \
  -d '{"text":"Hello world","fromLang":"en","toLang":"fr"}')
if [[ "$status" == "400" ]]; then pass "EN->FR refusé (400)"; else echo "[WARN] EN->FR status=$status"; fi

echo "\n-- Ajout communiqué test puis suppression --"
IN="${tmp_dir}/news_fr.json" OUT="${tmp_dir}/news_fr_updated.json" ID_FILE="${tmp_dir}/id" node - <<'NODE'
const fs = require('fs');
const inPath = process.env.IN;
const outPath = process.env.OUT;
const raw = JSON.parse(fs.readFileSync(inPath, 'utf8'));
const data = Array.isArray(raw.data) ? raw.data : [];
const id = `TEST_${Date.now()}`;
const item = {
  id,
  title: '[TEST] Élément éphémère',
  subtitle: 'Ajouté pour test',
  category: 'Test',
  date: new Date().toISOString().slice(0,10),
  content: '<p>Item de test</p>'
};
data.push(item);
fs.writeFileSync(outPath, JSON.stringify({ data }, null, 2));
fs.writeFileSync(process.env.ID_FILE, id);
console.log('ID test:', id);
NODE

id=$(cat "${tmp_dir}/id")
echo "ID=${id}"

echo "Sauvegarde..."
save_resp=$(curl -sS "${BASE_URL}/api/cms/content/news/fr" \
  -H "x-admin-password: ${ADMIN_PASSWORD}" \
  -H 'Content-Type: application/json' \
  -d @"${tmp_dir}/news_fr_updated.json")
echo "${save_resp}" | grep -q '"success":true' && pass "Sauvegarde" || fail "Sauvegarde"

echo "Vérification présence..."
curl -sS "${BASE_URL}/api/cms/content/news/fr" -H "x-admin-password: ${ADMIN_PASSWORD}" \
  | grep -q "${id}" && pass "Item présent" || fail "Item non trouvé"

echo "Suppression..."
del_resp=$(curl -sS -X DELETE "${BASE_URL}/api/cms/content/news/fr/${id}" -H "x-admin-password: ${ADMIN_PASSWORD}")
echo "${del_resp}" | grep -q '"success":true' && pass "Suppression" || fail "Suppression"

echo "Vérification retrait..."
if curl -sS "${BASE_URL}/api/cms/content/news/fr" -H "x-admin-password: ${ADMIN_PASSWORD}" | grep -q "${id}"; then
  fail "Item encore présent"
else
  pass "Item retiré"
fi

echo "\n=== Terminé ==="

