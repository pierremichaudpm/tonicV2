(function () {
  const BRAND = {
    instagram: '#E4405F', // Instagram solid brand color
    linkedin: '#0A66C2'   // LinkedIn brand blue
  };

  // On force les SVG inline existants (pas d'images raster pour éviter le fond blanc)

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

    function purgeImages(anchor) {
      if (!anchor) return;
      anchor.querySelectorAll('img').forEach(img => img.remove());
    }

    if (insta) {
      purgeImages(insta);
      const svg = insta.querySelector('svg');
      if (svg) {
        svg.style.width = '39px';
        svg.style.height = '39px';
        svg.setAttribute('fill', BRAND.instagram);
        svg.style.fill = BRAND.instagram;
        insta.style.background = 'transparent';
        insta.style.border = '0';
        insta.style.outline = 'none';
        insta.style.boxShadow = 'none';
        insta.addEventListener('mouseenter', () => { svg.style.filter = 'brightness(1.08)'; }, { passive: true });
        insta.addEventListener('mouseleave', () => { svg.style.filter = 'none'; }, { passive: true });
        changed = true;
      }
    }
    if (linked) {
      purgeImages(linked);
      const svg = linked.querySelector('svg');
      if (svg) {
        svg.style.width = '38px';
        svg.style.height = '38px';
        svg.style.transform = 'scale(1.0)';
        svg.style.transformOrigin = 'center';
        svg.setAttribute('fill', BRAND.linkedin);
        svg.style.fill = BRAND.linkedin;
        linked.style.background = 'transparent';
        linked.style.border = '0';
        linked.style.outline = 'none';
        linked.style.boxShadow = 'none';
        linked.addEventListener('mouseenter', () => { svg.style.filter = 'brightness(1.08)'; }, { passive: true });
        linked.addEventListener('mouseleave', () => { svg.style.filter = 'none'; }, { passive: true });
        changed = true;
      }
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

