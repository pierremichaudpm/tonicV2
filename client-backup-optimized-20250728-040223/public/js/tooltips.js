// JavaScript tooltip system for social media icons
document.addEventListener('DOMContentLoaded', function() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    let currentTooltip = null;

    function createTooltip(text, type) {
        const tooltip = document.createElement('div');
        tooltip.className = `js-tooltip ${type}`;
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        return tooltip;
    }

    function positionTooltip(tooltip, element) {
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        const left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        const top = rect.bottom + 10;
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }

    function showTooltip(element) {
        const tooltipText = element.getAttribute('data-tooltip');
        if (!tooltipText) return;
        
        let type = '';
        if (tooltipText === 'Instagram') type = 'instagram';
        if (tooltipText === 'LinkedIn') type = 'linkedin';
        
        currentTooltip = createTooltip(tooltipText, type);
        positionTooltip(currentTooltip, element);
        
        // Force show after positioning
        setTimeout(() => {
            currentTooltip.classList.add('show');
        }, 10);
    }

    function hideTooltip() {
        if (currentTooltip) {
            currentTooltip.remove();
            currentTooltip = null;
        }
    }

    // Add event listeners to all tooltip elements
    tooltipElements.forEach(element => {
        // Only add tooltips for Instagram and LinkedIn
        const tooltipText = element.getAttribute('data-tooltip');
        if (tooltipText === 'Instagram' || tooltipText === 'LinkedIn') {
            element.addEventListener('mouseenter', () => showTooltip(element));
            element.addEventListener('mouseleave', hideTooltip);
            element.addEventListener('click', hideTooltip);
        }
    });

    // Hide tooltip on scroll
    window.addEventListener('scroll', hideTooltip);
    window.addEventListener('resize', hideTooltip);
});