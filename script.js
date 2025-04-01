document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navUl = document.querySelector('nav ul');

    if (hamburgerMenu && navUl) {
        hamburgerMenu.addEventListener('click', () => {
            navUl.classList.toggle('show');
        });
    }

    const nameElement = document.getElementById('typingName');
    const nameText = "Angelos Angelis";
    let charIndex = 0;
    const typingSpeed = 100;
    let cursorSpan = document.createElement("span");
    cursorSpan.className = "typing-cursor";
    cursorSpan.style.marginLeft = "0";
    nameElement.appendChild(cursorSpan);

    function typeName() {
        if (charIndex < nameText.length) {
            nameElement.textContent = nameText.substring(0, charIndex + 1);
            charIndex++;
            let pause = typingSpeed;
            if (nameText.charAt(charIndex - 1) === " " || nameText.charAt(charIndex - 1) === ",") {
                pause = Math.floor(Math.random() * 500) + 300;
            }
            setTimeout(typeName, pause);

            cursorSpan.style.marginLeft = (charIndex * 0.6) + "em";
            cursorSpan.classList.add("fade-in");

            setTimeout(function() {
                cursorSpan.classList.remove("fade-in");
            }, pause - 50);
        } else {
            nameElement.removeChild(cursorSpan);
        }
    }

    setTimeout(typeName, 15);

    function checkVisible(elm) {
        let rect = elm.getBoundingClientRect();
        let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
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



