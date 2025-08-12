// Simple, safe timeline override – no dependency on React internals
(function () {
  function isEnglish() {
    const urlLang = new URLSearchParams(location.search).get('lang');
    if (urlLang && urlLang.toLowerCase() === 'en') return true;

    // Déduction via le bouton de langue: quand le bouton affiche "FR",
    // la langue active est l'anglais (le bouton montre la langue cible).
    const langSwitch = document.querySelector('.lang-switcher');
    if (langSwitch) {
      const label = (langSwitch.textContent || '').trim().toUpperCase();
      if (label.includes('FR')) return true; // anglais actif
      if (label.includes('EN')) return false; // français actif
    }

    // Fallback sur l'attribut html[lang]
    return (document.documentElement.lang || '').toLowerCase() === 'en';
  }

  const ITEMS_FR = [
    ["1978", "Serge Arsenault crée Serdy Vidéo. Les débuts de notre aventure dans le monde de la production audiovisuelle."],
    ["1979", "Une histoire de famille commence avec l'organisation du premier Marathon de Montréal."],
    ["1988 à 1992", "Organisation du prestigieux Grand Prix des Amériques."],
    ["1992 et 1994", "Production des Jeux olympiques de Barcelone et Lillehammer, pour TVA."],
    ["1999", "Organisation du Tour Trans-Canada."],
    ["2000", "Lancement de la chaîne Évasion, détenant les droits de diffusion du Tour de France."],
    ["2010", "Première édition des Grands Prix Cyclistes de Québec et de Montréal (GPCQM)."],
    ["2010", "Lancement de la chaîne Zeste et de la maison de production IDHD."],
    ["2013", "Lancement des magazines Zeste et Espaces."],
    ["2017", "Lancement du DOCK 619."],
    ["2019", "Vente de Groupe Serdy Media à TVA. Les GPCQM restent la propriété de Sébastien Arsenault."],
    ["2022", "Reprise du Marathon de Montréal à titre de Marathon Beneva de Montréal, sous la bannière Courons Montréal."],
    ["2022", "Obtention de l'organisation des Championnats du Monde Route UCI 2026 à Montréal."],
    ["2024", "Acquisition du 21K de Montréal sous la bannière Courons Montréal."],
    ["2025", "Acquisition du Volleyball World Beach Pro Tour Élite 16 Montréal."],
    ["2025", "Reprise des opérations du DOCK 619."]
  ];

  const ITEMS_EN = [
    ["1978", "Serge Arsenault founds Serdy Video. The beginnings of our adventure in the world of audiovisual production."],
    ["1979", "A family story begins with the organization of the first Montreal Marathon."],
    ["1988 to 1992", "Organization of the prestigious Grand Prix des Amériques."],
    ["1992 and 1994", "Production of the Barcelona 1992 and Lillehammer 1994 Olympic Games for TVA."],
    ["1999", "Organization of the Trans-Canada Tour."],
    ["2000", "Launch of the Évasion channel, holding the broadcast rights to the Tour de France."],
    ["2010", "First edition of the Grands Prix Cyclistes de Québec et de Montréal (GPCQM)."],
    ["2010", "Launch of the Zeste channel and the IDHD production house."],
    ["2013", "Launch of Zeste and Espaces magazines."],
    ["2017", "Launch of DOCK 619."],
    ["2019", "Sale of Groupe Serdy Media to TVA. The GPCQM remain the property of Sébastien Arsenault."],
    ["2022", "Resumption of the Montreal Marathon as the Marathon Beneva de Montréal, under the Courons Montréal banner."],
    ["2022", "Awarded the organization of the UCI Road World Championships 2026 in Montreal."],
    ["2024", "Acquisition of the 21K de Montréal under the Courons Montréal banner."],
    ["2025", "Acquisition of the Volleyball World Beach Pro Tour Elite 16 Montreal."],
    ["2025", "Resumption of operations of DOCK 619."]
  ];

  function getItems() { return isEnglish() ? ITEMS_EN : ITEMS_FR; }

  let lastSig = '';
  function pageSignature() {
    const qs = new URLSearchParams(location.search);
    const effectiveLang = isEnglish() ? 'en' : 'fr';
    return `${location.pathname}|${location.hash}|${(qs.get('lang')||'').toLowerCase()}|${effectiveLang}`;
  }

  function render() {
    try {
      const aboutTitle = Array.from(document.querySelectorAll('h2'))
        .find(h => /Notre histoire|Our History/i.test(h.textContent || ''));
      if (!aboutTitle) return false;
      const aboutSection = aboutTitle.parentElement;
      if (!aboutSection) return false;

      // Empêcher les rerenders inutiles (navigation sans changer de vue/langue)
      const sig = pageSignature();
      if (sig === lastSig && document.getElementById('timeline-override')) return true;
      lastSig = sig;

      // Construire le HTML des blocs
      const block = (year, text) => `
        <div class="tl-item" style="position:relative; margin-left:2.75rem; margin-bottom:2rem;">
          <div class="rounded-lg p-6 hover:shadow-lg transition-all" style="background:linear-gradient(135deg, rgba(255,0,0,0.08), rgba(255,96,26,0.06), rgba(255,66,99,0.08), rgba(0,0,0,0.85)); border:1px solid rgba(255,96,26,0.15);">
            <div class="tl-year" style="font-weight:800;font-size:1.25rem;margin-bottom:0.25rem;color:#e64545">${year}</div>
            <div style="color:#ffffff;opacity:0.95">${text}</div>
          </div>
        </div>`;
      const ITEMS = getItems();
      const bar = `<div class="tl-bar" style="position:absolute;left:16px;top:0;bottom:0;width:2px;background:#e64545;"></div>`;
      const newHtml = bar + ITEMS.map(([y, t]) => block(y, t)).join('');

      // Étape 1: supprimer tous les blocs existants de la section (sauf le titre H2)
      Array.from(aboutSection.children).forEach(child => {
        if (child !== aboutTitle) child.remove();
      });

      // Étape 2: créer un conteneur propre et y injecter la timeline
      const container = document.createElement('div');
      container.id = 'timeline-override';
      container.style.position = 'relative';
      container.innerHTML = newHtml;
      aboutSection.appendChild(container);

      // Étape 3: ajouter les points alignés sur la barre
      const items = Array.from(container.querySelectorAll('.tl-item'));
      items.forEach(item => {
        const yearEl = item.querySelector('.tl-year');
        const y = item.offsetTop + (yearEl ? (yearEl.offsetTop + yearEl.offsetHeight / 2) : 24);
        const dot = document.createElement('div');
        // Bar is at left:16px, 2px wide → center ≈ 17px. Dot 12px → left = 17 - 6 = 11px
        dot.style.cssText = 'position:absolute;left:11px;width:12px;height:12px;border-radius:9999px;background:#e64545;';
        dot.style.top = y + 'px';
        container.appendChild(dot);
      });

      return true;
    } catch (e) {
      console.warn('timeline.js failed:', e);
    }
  }

  function init() {
    // Premier rendu: si la section est déjà là
    if (render()) return;
    // Observer un seul montage de la section, puis on stoppe
    const mo = new MutationObserver(() => { if (render()) mo.disconnect(); });
    mo.observe(document.body, { childList: true, subtree: true });
    // Re-rendu uniquement sur changements d'URL (langue/navigation)
    window.addEventListener('popstate', () => setTimeout(render, 50));
    window.addEventListener('hashchange', () => setTimeout(render, 50));

    // Re-rendu sur clic du switch de langue (si l'app ne recharge pas la page)
    document.addEventListener('click', (ev) => {
      if (ev.target && ev.target.closest && ev.target.closest('.lang-switcher')) {
        setTimeout(render, 75);
      }
    }, true);
  }

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init);
})();

