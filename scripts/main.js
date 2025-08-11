document.addEventListener('DOMContentLoaded', function() {
    const home = document.getElementById('home');
    const home2 = document.getElementById('home2'); 
    const home3 = document.getElementById('home3');
    const writeups = document.getElementById('writeups');
    const about = document.getElementById('about');
    const projects = document.getElementById('projects');

    // Generic function to show a section and hide others
    function showSection(sectionId) {
        // Hide all sections
        if (home) home.style.display = 'none';
        if (writeups) writeups.style.display = 'none';
        if (about) about.style.display = 'none';
        if (projects) projects.style.display = 'none';
        
        // Show the specified section if it exists
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.style.display = 'block';
        }
    }

    // Add event listeners with null checks for the trigger elements
    const writeupsTrigger = document.getElementById('writeups-dis');
    if (writeupsTrigger) {
        writeupsTrigger.addEventListener('click', function(event) {
            event.preventDefault();
            showSection('writeups');
        });
    }

    const aboutTrigger = document.getElementById('about-dis');
    if (aboutTrigger) {
        aboutTrigger.addEventListener('click', function(event) {
            event.preventDefault();
            showSection('about');
        });
    } 

const projectTriggers = document.querySelectorAll('[data-role="projects-trigger"]');
projectTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(event) {
        event.preventDefault();
        showSection('projects');
    });
});
    
// Utility function to show a home section
function showHomeSection(target) {
    if (home) home.style.display = 'none';
    if (home2) home2.style.display = 'none';
    if (home3) home3.style.display = 'none';
    if (writeups) writeups.style.display = 'none';
    if (about) about.style.display = 'none';
    if (projects) projects.style.display = 'none';

    if (target === 'home2' && home2) home2.style.display = 'block';
    else if (target === 'home3' && home3) home3.style.display = 'block';
}

// Attach event listener to all elements with data-page-target
pageTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.currentTarget.getAttribute('data-page-target');
        console.log("Clicked, showing:", target);
        showHomeSection(target);
    });
});


// Auto sound play
window.addEventListener('load', () => {
    const audio = document.getElementById('myAudio');
    if (!audio) return; // If audio element doesn't exist, exit early

    let isPlaying = false;

    audio.play().catch((error) => { 
        console.log("Autoplay prevented:", error); 
        // Optionally show a message to user
    });

    document.body.addEventListener('click', () => {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
            }).catch((err) => { 
                console.log("Song play blocked, error:", err); 
            });
        } else {
            audio.pause();
            audio.currentTime = 0;
            isPlaying = false;
        }
    });
});


// img zoom functionality
document.addEventListener("DOMContentLoaded", function () {
  const zoomableImages = document.querySelectorAll(".zoomable-img");

  // Create overlay on the fly
  const overlay = document.createElement("div");
  overlay.id = "imgOverlay";
  overlay.innerHTML = `<img src="" alt="Zoomed Image">`;
  overlay.style.display = "none";
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector("img");

  // Add click event to each zoomable image
  zoomableImages.forEach(img => {
    img.addEventListener("click", () => {
      overlayImg.src = img.src;
      overlay.style.display = "flex";
    });
  });

  // Hide overlay on click
  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });
});


// img switch & glitch anim
const images = [
    '/img/hope.jpg',
    '/img/SudoHopeX.jpg'
  ];

  let currentIndex = 0;
  const imgElement = document.getElementById('dynamic-img');
  const intervalTime = 7000; // Change image every 3 seconds

  setInterval(() => {
    // Add glitch effect
    imgElement.classList.add('glitch-effect');

    // Switch image slightly after glitch starts
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      imgElement.src = images[currentIndex];
    }, 150);

    // Remove glitch class after animation ends
    setTimeout(() => {
      imgElement.classList.remove('glitch-effect');
    }, 500);
  }, intervalTime);


// auto scroll to top button
const scrollBtn = document.getElementById("scrollToTopBtn");

if (scrollBtn !== null) {
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    const isScrollingUp = scrollTop < lastScrollTop;

    // Only show when user is scrolling UP and below 25%
    if (isScrollingUp && scrollPercent > 25) {
      scrollBtn.style.display = "flex";
    } else {
      scrollBtn.style.display = "none";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // prevent negative values
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


function sendE(){
    const u = "sud0hope";
    const v = "techie";
    const d = "gamil.com";
    const e = `${u}.${v}@${d}`;
    window.location.href = `mailto:${e}`;
}

// script for slogan part
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
        sloganElement.textContent = [...currentSlogan].map((char, index) => index < charIndex ? char : getRandomCharacter()).join("");
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

    if (/complete|interactive/.test(document.readyState)) {
    setTimeout(startSloganChange, 1);
    } else {
    document.addEventListener("DOMContentLoaded", startSloganChange);
    }

// Central record for project-articles-writeups
  const contentStats = {
    articles: 4,
    projectDocs: 5,
    writeups: 0
  };

  // Function to inject values into HTML
  function updateContentStats() {
    document.getElementById("articleCount").textContent = contentStats.articles;
    document.getElementById("projectCount").textContent = contentStats.projectDocs;
    document.getElementById("writeupCount").textContent = contentStats.writeups;
  }

  // Run on page load
  window.onload = updateContentStats;

    
// copy code 
document.addEventListener('DOMContentLoaded', function () {
    const copyButtons = document.querySelectorAll('.code-cp-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', async function () {
            try {
                // Traverse to the nearest <pre><code> after the button
                const codeBlock = button.closest('.code-block-wrapper')?.querySelector('.code-txt');
                if (!codeBlock) return;

                await navigator.clipboard.writeText(codeBlock.textContent.trim());

                const originalSVG = button.innerHTML;
                button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>`;

                setTimeout(() => {
                    button.innerHTML = originalSVG;
                }, 2000);
            } catch (err) {
                console.error('Copy failed:', err);
            }
        });
    });
});

/* 30 days of XSS script */
document.querySelectorAll('.topic').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const dayId = this.getAttribute('href').replace('#', '');
        const content = document.querySelector(`.${dayId}-content`);
        if (!content) return;

        // If already visible, hide it
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            // Hide all others
            document.querySelectorAll('[class$="-content"]').forEach(c => {
                c.style.display = 'none';
            });
            // Show this one
            content.style.display = 'block';
        }
    });
});


