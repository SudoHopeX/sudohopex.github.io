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

    const projectsTrigger1 = document.getElementById('projects-dis');
    if (projectsTrigger1) {
        projectsTrigger1.addEventListener('click', function(event) {
            event.preventDefault();
            showSection('projects');
        });
    }

    const projectsTrigger2 = document.getElementById('projects-dis2');
    if (projectsTrigger2) {
        projectsTrigger2.addEventListener('click', function(event) {
            event.preventDefault();
            showSection('projects'); // Reusing the same function for both triggers
        });
    } 

    const element1 = document.getElementById('page-rotate-home2');
    const element2 = document.getElementById('page-rotate-h2');
    const element3 = document.getElementById('page-rotate-home3');
    const element4 = document.getElementById('page-rotate-h3');

    // Define functions
    function show_home2() {
        if (home) home.style.display = 'none';
        if (home2) home2.style.display = 'block';
        if (home3) home3.style.display = 'none';
        if (writeups) writeups.style.display = 'none';
        if (about) about.style.display = 'none';
        if (projects) projects.style.display = 'none';
    }

    function show_home3() {
        if (home) home.style.display = 'none';
        if (home2) home2.style.display = 'none';
        if (home3) home3.style.display = 'block';
        if (writeups) writeups.style.display = 'none';
        if (about) about.style.display = 'none';
        if (projects) projects.style.display = 'none';
    }

    // Attach event listeners with null checks
    if (element1) {
        element1.addEventListener('click', function(event) {
            event.preventDefault();
            show_home2();
        });
    }
    if (element2) {
        element2.addEventListener('click', function(event) {
            event.preventDefault();
            show_home2();
        });
    }
    if (element3) {
        element3.addEventListener('click', function(event) {
            event.preventDefault();
            show_home3();
        });
    }
    if (element4) {
        element4.addEventListener('click', function(event) {
            event.preventDefault();
            show_home3();
        });
    }
});

// Auto sound play
window.addEventListener('load', () => {
    const audio = document.getElementById('myAudio');
    let isPlaying = false;

    audio.play().catch((error) => { 
        console.log("Autoplay prevented : ", error); 
        // alert("Click anywhere to enable Sound..");
    });

    document.body.addEventListener('click', () => {
        if(!isPlaying) {
            audio.play().then(() =>  {
                    isPlaying = true;
            }).catch((err) => { 
                console.log(" Song play Blocked, error: ", err); 
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
