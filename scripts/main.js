document.addEventListener('DOMContentLoaded', function () {
    // Section references
    const home = document.getElementById('home');
    const home2 = document.getElementById('home2');
    const home3 = document.getElementById('home3');
    const writeups = document.getElementById('writeups');
    const about = document.getElementById('about');
    const projects = document.getElementById('projects');

    // Show one section, hide others
    function showSection(sectionId) {
        [home, writeups, about, projects].forEach(section => {
            if (section) section.style.display = 'none';
        });
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) sectionElement.style.display = 'block';
    }

    // Show home variants
    function showHomeSection(target) {
        [home, home2, home3, writeups, about, projects].forEach(section => {
            if (section) section.style.display = 'none';
        });

        if (target === 'home2' && home2) home2.style.display = 'block';
        else if (target === 'home3' && home3) home3.style.display = 'block';
    }

    // Navigation triggers
    const writeupsTrigger = document.getElementById('writeups-dis');
    if (writeupsTrigger) {
        writeupsTrigger.addEventListener('click', e => {
            e.preventDefault();
            showSection('writeups');
        });
    }

    const aboutTrigger = document.getElementById('about-dis');
    if (aboutTrigger) {
        aboutTrigger.addEventListener('click', e => {
            e.preventDefault();
            showSection('about');
        });
    }

    document.querySelectorAll('[data-role="projects-trigger"]').forEach(trigger => {
        trigger.addEventListener('click', e => {
            e.preventDefault();
            showSection('projects');
        });
    });

    document.querySelectorAll('[data-page-target]').forEach(trigger => {
        trigger.addEventListener('click', e => {
            e.preventDefault();
            const target = e.currentTarget.getAttribute('data-page-target');
            console.log("target:", target);
            showHomeSection(target);
        });
    });

    // Slogan animation
    const slogans = [
        "( Developer )",
        "( Ethical Hacker )",
        "( Pentester )",
        "( Cyber Awareness Advocate )",
        "( Learner & Explorer )"
    ];
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]<>.,;:";
    const sloganElement = document.querySelector(".slogan");
    let currentSloganIndex = 0;

    function addOrRemoveClass(element, className, add) {
        element.classList[add ? "add" : "remove"](className);
    }

    function getRandomCharacter() {
        return characters[Math.floor(Math.random() * characters.length)];
    }

    function changeSlogan() {
        addOrRemoveClass(sloganElement, "glitch", false);
        const currentSlogan = slogans[currentSloganIndex];
        const sloganLength = currentSlogan.length;
        let charIndex = 0;

        const interval = setInterval(() => {
            sloganElement.textContent = [...currentSlogan].map((char, index) =>
                index < charIndex ? char : getRandomCharacter()
            ).join("");
            charIndex++;
            if (charIndex > sloganLength) {
                clearInterval(interval);
                addOrRemoveClass(sloganElement, "glitch", true);
                sloganElement.dataset.text = sloganElement.textContent;
                currentSloganIndex = (currentSloganIndex + 1) % slogans.length;
            }
        }, 15);
    }

    function startSloganChange() {
        changeSlogan();
        setInterval(changeSlogan, 4000);
    }

    startSloganChange();

    // Image zoom overlay
    const zoomableImages = document.querySelectorAll(".zoomable-img");
    const overlay = document.createElement("div");
    overlay.id = "imgOverlay";
    overlay.innerHTML = `<img src="" alt="Zoomed Image">`;
    overlay.style.display = "none";
    document.body.appendChild(overlay);
    const overlayImg = overlay.querySelector("img");

    zoomableImages.forEach(img => {
        img.addEventListener("click", () => {
            overlayImg.src = img.src;
            overlay.style.display = "flex";
        });
    });

    overlay.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    // Copy code functionality
    document.querySelectorAll('.code-cp-btn').forEach(button => {
        button.addEventListener('click', async () => {
            try {
                const codeBlock = button.closest('.code-block-wrapper')?.querySelector('.code-txt');
                if (!codeBlock) return;

                await navigator.clipboard.writeText(codeBlock.textContent.trim());

                const originalSVG = button.innerHTML;
                button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
                setTimeout(() => {
                    button.innerHTML = originalSVG;
                }, 2000);
            } catch (err) {
                console.error('Copy failed:', err);
            }
        });
    });

    // XSS topic toggles
    document.querySelectorAll('.topic').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const dayId = this.getAttribute('href').replace('#', '');
            const content = document.querySelector(`.${dayId}-content`);
            if (!content) return;

            const allContents = document.querySelectorAll('[class$="-content"]');
            allContents.forEach(c => c.style.display = 'none');

            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Scroll-to-top button
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (scrollBtn) {
        let lastScrollTop = 0;
        window.addEventListener("scroll", () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            const isScrollingUp = scrollTop < lastScrollTop;

            scrollBtn.style.display = (isScrollingUp && scrollPercent > 25) ? "flex" : "none";
            lastScrollTop = Math.max(scrollTop, 0);
        });

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Central record for project-articles-writeups
    const contentStats = {
        articles: 4,
        projectDocs: 5,
        writeups: 0
    };

    function updateContentStats() {
        document.getElementById("articleCount").textContent = contentStats.articles;
        document.getElementById("projectCount").textContent = contentStats.projectDocs;
        document.getElementById("writeupCount").textContent = contentStats.writeups;
    }

    updateContentStats();
});

// Audio autoplay and toggle
window.addEventListener('load', () => {
    const audio = document.getElementById('myAudio');
    if (!audio) return;

    let isPlaying = false;

    audio.play().catch(error => {
        console.log("Autoplay prevented:", error);
    });

    document.body.addEventListener('click', () => {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
            }).catch(err => {
                console.log("Song play blocked, error:", err);
            });
        } else {
            audio.pause();
            audio.currentTime = 0;
            isPlaying = false;
        }
    });

    // Glitch image switch
    const images = ['/img/hope.jpg', '/img/SudoHopeX.jpg'];
    let currentIndex = 0;
    const imgElement = document.getElementById('dynamic-img');
    const intervalTime = 7000;

    if (imgElement) {
        setInterval(() => {
            imgElement.classList.add('glitch-effect');
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % images.length;
                imgElement.src = images[currentIndex];
            }, 150);
            setTimeout(() => {
                imgElement.classList.remove('glitch-effect');
            }, 500);
        }, intervalTime);
    }
});


function sendE() {
    const u = "sud0hope";
    const v = "techie";
    const d = "gmail.com"; 
    const e = `${u}.${v}@${d}`;
    window.location.href = `mailto:${e}`;
}
