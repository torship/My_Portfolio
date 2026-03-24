// main.js

// --- Navigation & Scroll Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons safely after DOM load
    lucide.createIcons();

    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('section');
    const navContainer = document.getElementById('nav-container');

    const inactiveClasses = [
        'flex-shrink-0', 'px-4', 'py-2', 'sm:py-2.5', 'rounded-full',
        'text-[10px]', 'sm:text-xs', 'font-medium', 'tracking-widest',
        'uppercase', 'transition-all', 'duration-300', 'active:scale-90',
        'text-zinc-400', 'hover:text-white', 'hover:bg-white/5'
    ];

    const activeClasses = [
        'flex-shrink-0', 'px-4', 'py-2', 'sm:py-2.5', 'rounded-full',
        'text-[10px]', 'sm:text-xs', 'font-medium', 'tracking-widest',
        'uppercase', 'transition-all', 'duration-300', 'active:scale-90',
        'bg-cyan-400/20', 'text-cyan-300', 'shadow-[inset_0_0_10px_rgba(0,232,255,0.3)]'
    ];

    function setActiveButton(activeId) {
        navButtons.forEach(btn => {
            btn.classList.remove(...activeClasses);
            btn.classList.add(...inactiveClasses);
        });

        const activeBtn = document.querySelector(`.nav-btn[data-target="${activeId}"]`);
        if (!activeBtn) return;

        activeBtn.classList.remove(...inactiveClasses);
        activeBtn.classList.add(...activeClasses);

        if (navContainer.scrollWidth > navContainer.clientWidth) {
            const scrollLeft = activeBtn.offsetLeft - (navContainer.clientWidth / 2) + (activeBtn.clientWidth / 2);
            navContainer.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
        }
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.currentTarget.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveButton(entry.target.id);
            }
        });
    }, { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    sections.forEach(section => {
        if (document.querySelector(`.nav-btn[data-target="${section.id}"]`)) {
            observer.observe(section);
        }
    });

    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.15 });
    
    revealElements.forEach(el => revealObserver.observe(el));

    setActiveButton('architect');
});

// --- Custom Cursor Logic ---
const customCursor = document.getElementById('custom-cursor');
const cursorTrail = document.getElementById('cursor-trail');

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;

    cursorTrail.style.left = `${e.clientX}px`;
    cursorTrail.style.top = `${e.clientY}px`;
    cursorTrail.style.opacity = 1;
    cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';

    clearTimeout(cursorTrail.fadeTimeout);
    cursorTrail.fadeTimeout = setTimeout(() => {
        cursorTrail.style.opacity = 0;
        cursorTrail.style.transform = 'translate(-50%, -50%) scale(0.5)';
    }, 150);
});

if ('ontouchstart' in window) {
    customCursor.style.display = 'none';
    cursorTrail.style.display = 'none';
}