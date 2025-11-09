// script.js
// - robust hamburger behavior (toggle, close on click, close on resize)
// - prevents body scroll when mobile nav is open
// - typewriter fix (cursor preserved with separate span)
// - scroll reveal with safe guards

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger/menu logic
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list'); // ul.nav-list
    const body = document.body;

    function openMenu() {
        navList.classList.add('show');
        hamburger.setAttribute('aria-expanded', 'true');
        body.classList.add('nav-open'); // used to lock scroll
        document.addEventListener('click', outsideClickHandler);
    }
    function closeMenu() {
        navList.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
        body.classList.remove('nav-open');
        document.removeEventListener('click', outsideClickHandler);
    }
    function toggleMenu() {
        if (navList.classList.contains('show')) closeMenu(); else openMenu();
    }

    function outsideClickHandler(e) {
        if (!navList.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    }

    if (hamburger && navList) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // close menu when a nav link is clicked (mobile)
        navList.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                if (navList.classList.contains('show')) closeMenu();
            });
        });

        // close menu if window is resized above mobile breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth > 767 && navList.classList.contains('show')) {
                closeMenu();
            }
        });
    }

    // Typewriter (fixed): use text span + cursor span so textContent doesn't remove cursor
    const nameElement = document.getElementById('typingName');
    if (nameElement) {
        const nameText = "Angelos Angelis";
        const textSpan = document.createElement('span');
        textSpan.className = 'typing-text';
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor';
        cursorSpan.setAttribute('aria-hidden', 'true');
        nameElement.textContent = '';
        nameElement.appendChild(textSpan);
        nameElement.appendChild(cursorSpan);

        let charIndex = 0;
        const typingSpeed = 100;

        function typeName() {
            if (charIndex < nameText.length) {
                textSpan.textContent = nameText.substring(0, charIndex + 1);
                charIndex++;
                let pause = typingSpeed;
                const lastChar = nameText.charAt(charIndex - 1);
                if (lastChar === ' ' || lastChar === ',') {
                    pause = Math.floor(Math.random() * 500) + 300;
                }
                cursorSpan.classList.add('fade-in');
                setTimeout(() => cursorSpan.classList.remove('fade-in'), Math.max(50, pause - 50));
                setTimeout(typeName, pause);
            }
        }
        setTimeout(typeName, 15);
    }

    // Scroll reveal (safe guards)
    function checkVisible(elm) {
        if (!elm) return false;
        const rect = elm.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return (rect.bottom > 0 && rect.top < viewHeight);
    }

    function scrollHandler() {
        let paragraphs = document.querySelectorAll('.bio-intro .bio-content p, #typing-wrapper p');
        paragraphs.forEach(paragraph => {
            if (checkVisible(paragraph)) paragraph.classList.add('visible');
        });

        let cvEntries = document.querySelectorAll('.cv-page .cv-entry');
        cvEntries.forEach(entry => {
            if (checkVisible(entry)) entry.classList.add('visible');
        });
    }

    window.addEventListener('scroll', scrollHandler);
    scrollHandler();
});
