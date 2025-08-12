(function () {
  const BRAND = {
    instagram: '#E4405F', // Instagram solid brand color
    linkedin: '#0A66C2'   // LinkedIn brand blue
  };

  function tint(hex, amount) {
    try {
      const num = parseInt(hex.replace('#', ''), 16);
      let r = (num >> 16) + amount;
      let g = ((num >> 8) & 0x00ff) + amount;
      let b = (num & 0x0000ff) + amount;
      r = Math.max(0, Math.min(255, r));
      g = Math.max(0, Math.min(255, g));
      b = Math.max(0, Math.min(255, b));
      return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    } catch {
      return hex;
    }
  }

  function getContactRoot() {
    const titles = Array.from(document.querySelectorAll('h1.page-title'));
    const contactTitle = titles.find(h => /Contact Us|Nous joindre/i.test(h.textContent || ''));
    if (!contactTitle) return null;
    return contactTitle.closest('.container') || contactTitle.parentElement || document.body;
  }

  function applyColoredIcons() {
    const root = getContactRoot();
    if (!root) return false;

    const insta = root.querySelector('a[href*="instagram.com/groupe.tonic"]');
    const linked = root.querySelector('a[href*="linkedin.com/company/groupe-tonic"]');
    let changed = false;

    if (insta) {
      // Force SVG fill to brand color to avoid React hover overriding anchor color
      const svg = insta.querySelector('svg');
      if (svg) {
        svg.setAttribute('fill', BRAND.instagram);
        svg.style.fill = BRAND.instagram;
        insta.addEventListener('mouseenter', () => { svg.style.fill = tint(BRAND.instagram, 20); }, { passive: true });
        insta.addEventListener('mouseleave', () => { svg.style.fill = BRAND.instagram; }, { passive: true });
      } else {
        insta.style.color = BRAND.instagram;
        insta.addEventListener('mouseenter', () => { insta.style.color = tint(BRAND.instagram, 20); }, { passive: true });
        insta.addEventListener('mouseleave', () => { insta.style.color = BRAND.instagram; }, { passive: true });
      }
      changed = true;
    }
    if (linked) {
      const svg = linked.querySelector('svg');
      if (svg) {
        svg.setAttribute('fill', BRAND.linkedin);
        svg.style.fill = BRAND.linkedin;
        linked.addEventListener('mouseenter', () => { svg.style.fill = tint(BRAND.linkedin, 20); }, { passive: true });
        linked.addEventListener('mouseleave', () => { svg.style.fill = BRAND.linkedin; }, { passive: true });
      } else {
        linked.style.color = BRAND.linkedin;
        linked.addEventListener('mouseenter', () => { linked.style.color = tint(BRAND.linkedin, 20); }, { passive: true });
        linked.addEventListener('mouseleave', () => { linked.style.color = BRAND.linkedin; }, { passive: true });
      }
      changed = true;
    }
    return changed;
  }

  function init() {
    if (applyColoredIcons()) return;
    const mo = new MutationObserver(() => {
      if (applyColoredIcons()) mo.disconnect();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('hashchange', () => setTimeout(applyColoredIcons, 50));
    window.addEventListener('popstate', () => setTimeout(applyColoredIcons, 50));
  }

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init);
})();

