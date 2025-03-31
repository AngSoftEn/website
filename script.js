document.addEventListener('DOMContentLoaded', function() {
    const bioContent = document.querySelector('.bio-intro .bio-content');
    const body = document.body;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                body.classList.add('bio-visible');
            } else {
                body.classList.remove('bio-visible');
            }
        });
    });

    observer.observe(bioContent);
});

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        document.querySelector('.hero').classList.add('scrolled');
    } else {
        document.querySelector('.hero').classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('.contact');

    sections.forEach(section => {
        const sectionPos = section.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            section.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        }
    });
});

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

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Loaded");
    setTimeout(function(){
        console.log("typeName");
        typeName();
    }, 15);
    adjustCarousel();
});

const bioContent = document.querySelector('.bio-intro .bio-content');
const paragraphs = document.querySelectorAll('.bio-intro .bio-content div:nth-child(2) p');
const typingParagraph = document.querySelector('#typing-wrapper p');

let fullText = '';
paragraphs.forEach(paragraph => {
    fullText += paragraph.textContent + ' ';
});

let charIndexBio = 0;
const typingSpeedBio = 50;

function type() {
    if (charIndexBio < fullText.length) {
        typingParagraph.textContent = fullText.substring(0, charIndexBio + 1);
        charIndexBio++;
        setTimeout(type, typingSpeedBio);
    }
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            type();
            observer.unobserve(bioContent);
        }
    });
});



