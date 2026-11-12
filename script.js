// =========================================================
//  데이터 — 여기만 수정하면 사이트 내용이 바뀝니다
// =========================================================
const ROLES = ['웹 개발자', 'AI 활용 개발자', 'HR서비스팀 개발자'];

const SKILLS = [
    { category: 'Frontend', icon: '🎨', items: ['HTML/CSS', 'JavaScript', 'jQuery'] },
    { category: 'Backend', icon: '⚙️', items: ['Java', 'Spring', 'Spring Boot'] },
    { category: 'Database & AI', icon: '🗄️', items: ['Oracle', 'AI API 연동'] },
];

// link / demo 값을 넣으면 카드에 버튼이 생깁니다
const PROJECTS = [
    {
        title: 'AI 활용 웹 애플리케이션',
        description: 'Spring Boot와 AI API를 통합해 사용자 경험을 높인 웹 애플리케이션 개발',
        tags: ['Spring Boot', 'JavaScript', 'AI'],
        gradient: 'from-blue-500 to-indigo-500',
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        link: '',
        demo: '',
    },
    {
        title: 'HR 관리 시스템',
        description: 'HR서비스팀 요구사항에 맞춘 인사관리 시스템 개발 및 유지보수',
        tags: ['Java', 'Spring', 'Oracle'],
        gradient: 'from-violet-500 to-purple-600',
        icon: 'M17 20h5v-2a3 3 0 0 0-5.36-1.86M17 20H7m10 0v-2c0-.66-.13-1.28-.36-1.86M7 20H2v-2a3 3 0 0 1 5.36-1.86M7 20v-2c0-.66.13-1.28.36-1.86m0 0a5 5 0 0 1 9.28 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
        link: '',
        demo: '',
    },
    {
        title: '데이터 분석 대시보드',
        description: 'Oracle 데이터베이스와 jQuery로 만든 실시간 데이터 분석·시각화 대시보드',
        tags: ['Oracle', 'jQuery', 'Dashboard'],
        gradient: 'from-emerald-500 to-teal-500',
        icon: 'M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z',
        link: '',
        demo: '',
    },
];

// =========================================================
//  렌더링
// =========================================================
const escapeHTML = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function renderSkills() {
    document.getElementById('skills-grid').innerHTML = SKILLS.map((group) => `
        <div class="reveal card card-hover p-6">
            <div class="flex items-center gap-3 mb-5">
                <span class="text-2xl" aria-hidden="true">${group.icon}</span>
                <h3 class="font-bold text-lg">${escapeHTML(group.category)}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
                ${group.items.map((item) => `<span class="tag">${escapeHTML(item)}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderProjects() {
    const linkBtn = (href, label) => href
        ? `<a href="${escapeHTML(href)}" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-accent hover:underline">${label} →</a>`
        : '';

    document.getElementById('projects-grid').innerHTML = PROJECTS.map((p) => `
        <article class="reveal card card-hover overflow-hidden flex flex-col">
            <div class="h-40 bg-gradient-to-br ${p.gradient} flex items-center justify-center">
                <svg class="w-16 h-16 text-white/80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="${p.icon}"/>
                </svg>
            </div>
            <div class="p-6 flex flex-col flex-1">
                <h3 class="font-bold text-lg mb-2">${escapeHTML(p.title)}</h3>
                <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 flex-1">${escapeHTML(p.description)}</p>
                <div class="flex flex-wrap gap-2">
                    ${p.tags.map((t) => `<span class="tag">${escapeHTML(t)}</span>`).join('')}
                </div>
                ${p.link || p.demo ? `<div class="flex gap-4 mt-5">${linkBtn(p.link, 'GitHub')}${linkBtn(p.demo, '데모')}</div>` : ''}
            </div>
        </article>
    `).join('');
}

// =========================================================
//  인터랙션
// =========================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initTyping() {
    const el = document.getElementById('typing');
    if (prefersReducedMotion) {
        el.textContent = ROLES[0];
        return;
    }
    let role = 0, char = 0, deleting = false;

    (function tick() {
        const word = ROLES[role];
        char += deleting ? -1 : 1;
        el.textContent = word.slice(0, char);

        let delay = deleting ? 50 : 110;
        if (!deleting && char === word.length) { deleting = true; delay = 1800; }
        else if (deleting && char === 0) { deleting = false; role = (role + 1) % ROLES.length; delay = 400; }
        setTimeout(tick, delay);
    })();
}

function initTheme() {
    document.getElementById('theme-toggle').addEventListener('click', () => {
        const dark = document.documentElement.classList.toggle('dark');
        try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    });
}

function initMobileMenu() {
    const btn = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const setOpen = (open) => {
        menu.classList.toggle('hidden', !open);
        btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', () => setOpen(menu.classList.contains('hidden')));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    window.addEventListener('resize', () => { if (window.innerWidth >= 768) setOpen(false); });
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // 현재 보고 있는 섹션을 메뉴에 표시
    const links = document.querySelectorAll('.nav-link, .mobile-link');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));
}

function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => observer.observe(el));
}

function initCopyEmail() {
    const btn = document.getElementById('copy-email');
    const toast = document.getElementById('toast');
    let timer;

    btn.addEventListener('click', async () => {
        const email = btn.dataset.email;
        try {
            await navigator.clipboard.writeText(email);
        } catch (e) {
            // clipboard API를 못 쓰는 환경(예: file://)용 대체 방법
            const ta = document.createElement('textarea');
            ta.value = email;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
        }
        toast.classList.add('show');
        clearTimeout(timer);
        timer = setTimeout(() => toast.classList.remove('show'), 2000);
    });
}

// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderProjects();
    document.getElementById('year').textContent = new Date().getFullYear();

    initTheme();
    initTyping();
    initMobileMenu();
    initNavbar();
    initReveal();
    initCopyEmail();
});
