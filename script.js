// Updated script.js — fixes typewriter cursor bug, adds accessibility for hamburger toggle,
// guards for missing elements, and keeps scroll-based reveal behavior.
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navUl = document.querySelector('nav ul');

    if (hamburgerMenu && navUl) {
        hamburgerMenu.addEventListener('click', () => {
            navUl.classList.toggle('show');
            // update aria-expanded for accessibility
            const expanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
            hamburgerMenu.setAttribute('aria-expanded', String(!expanded));
        });
    }

    const nameElement = document.getElementById('typingName');
    if (nameElement) {
        const nameText = "Angelos Angelis";
        let charIndex = 0;
        const typingSpeed = 100;

        // Create two spans: one for text and one for the cursor so updates don't remove cursor
        const textSpan = document.createElement('span');
        textSpan.className = 'typing-text';
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor';
        cursorSpan.setAttribute('aria-hidden', 'true');

        // Empty the container and append spans
        nameElement.textContent = '';
        nameElement.appendChild(textSpan);
        nameElement.appendChild(cursorSpan);

        function typeName() {
            if (charIndex < nameText.length) {
                textSpan.textContent = nameText.substring(0, charIndex + 1);
                charIndex++;
                let pause = typingSpeed;
                const lastChar = nameText.charAt(charIndex - 1);
                if (lastChar === ' ' || lastChar === ',') {
                    pause = Math.floor(Math.random() * 500) + 300;
                }
                // Small visual pulse on cursor
                cursorSpan.classList.add('fade-in');
                setTimeout(function() {
                    cursorSpan.classList.remove('fade-in');
                }, Math.max(50, pause - 50));

                setTimeout(typeName, pause);
            } else {
                // done typing — keep cursor visible (or remove if preferred)
                cursorSpan.classList.remove('fade-in');
            }
        }

        setTimeout(typeName, 15);
    }

    function checkVisible(elm) {
        if (!elm) return false;
        const rect = elm.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return (rect.bottom > 0 && rect.top < viewHeight);
    }

    function scrollHandler() {
        let paragraphs = document.querySelectorAll('.bio-intro .bio-content p, #typing-wrapper p');
        paragraphs.forEach(paragraph => {
            if (checkVisible(paragraph)) {
                paragraph.classList.add('visible');
            } else {
                paragraph.classList.remove('visible');
            }
        });

        // Scroll effect for CV entries
        let cvEntries = document.querySelectorAll('.cv-page .cv-entry');
        cvEntries.forEach(entry => {
            if (checkVisible(entry)) {
                entry.classList.add('visible');
            } else {
                entry.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', scrollHandler);
    scrollHandler();
});
