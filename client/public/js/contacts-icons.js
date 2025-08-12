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

  function applyColoredIcons() {
    const insta = document.querySelector('a[href*="instagram.com/groupe.tonic"]');
    const linked = document.querySelector('a[href*="linkedin.com/company/groupe-tonic"]');
    let changed = false;

    if (insta) {
      insta.style.color = BRAND.instagram;
      insta.addEventListener('mouseenter', () => { insta.style.color = tint(BRAND.instagram, 20); });
      insta.addEventListener('mouseleave', () => { insta.style.color = BRAND.instagram; });
      changed = true;
    }
    if (linked) {
      linked.style.color = BRAND.linkedin;
      linked.addEventListener('mouseenter', () => { linked.style.color = tint(BRAND.linkedin, 20); });
      linked.addEventListener('mouseleave', () => { linked.style.color = BRAND.linkedin; });
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

