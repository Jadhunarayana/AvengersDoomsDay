
/* ==========================================
   DOOMSDAY - WEBSITE JAVASCRIPT
========================================== */


/* ==========================================
   1. LOADING SCREEN
========================================== */

const loader = document.getElementById("loader");

window.addEventListener("load", () => {

    setTimeout(() => {

        if (loader) {
            loader.classList.add("hidden");
        }

    }, 1000);

});


/* ==========================================
   2. MOBILE NAVIGATION
========================================== */

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

    document.querySelectorAll("#navMenu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* ==========================================
   3. CHARACTER DATABASE
========================================== */


const characters = [

    {
        name: "Doctor Doom",
        role: "The Mastermind",
        symbol: "D",
        image: "assets/images/doom-closeup.jpg",
        description:
            "Victor von Doom is a brilliant scientist, ruler and master of sorcery. His ambition and extraordinary intelligence make him one of Marvel's most formidable villains."
    },

    {
        name: "Iron Man",
        role: "The Armoured Avenger",
        symbol: "I",
        image: "assets/images/iron-man.jpg",
        description:
            "Tony Stark is a brilliant inventor who uses advanced technology and powered armour to protect humanity."
    },

    {
        name: "Captain America",
        role: "The Super Soldier",
        symbol: "A",
        image: "assets/images/captain-america.jpg",
        description:
            "Steve Rogers represents courage, leadership and an unwavering commitment to protecting humanity."
    },

    {
        name: "Thor",
        role: "God of Thunder",
        symbol: "T",
        image: "assets/images/thor.jpg",
        description:
            "Thor is the Asgardian God of Thunder, possessing extraordinary strength and command over lightning."
    },

    {
        name: "Spider-Man",
        role: "The Friendly Neighbourhood Hero",
        symbol: "S",
        image: "assets/images/spider-man.jpg",
        description:
            "Peter Parker combines extraordinary abilities, intelligence and responsibility to protect others."
    },

    {
        name: "Doctor Strange",
        role: "Master of the Mystic Arts",
        symbol: "M",
        image: "assets/images/doctor-strange.jpg",
        description:
            "Stephen Strange is a powerful sorcerer who protects reality through his knowledge of the mystic arts."
    }

];


/* ==========================================
   4. GENERATE CHARACTER CARDS
========================================== */

const characterGrid = document.getElementById("characterGrid");

if (characterGrid) {

    characters.forEach((character, index) => {

        const card = document.createElement("article");

        card.className = "character-card";

        card.innerHTML = `
            <div class="character-image">
                <img
                    src="${character.image}"
                    alt="${character.name}"
                    loading="lazy"
                />
            </div>

            <div class="character-info">
                <span class="symbol">${character.symbol}</span>
                <h3>${character.name}</h3>
                <p>${character.role}</p>
                <span class="view-details">VIEW DETAILS →</span>
            </div>
        `;

        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");

        card.addEventListener("click", () => {
            openCharacter(index);
        });

        card.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openCharacter(index);
            }

        });

        characterGrid.appendChild(card);

    });

}



/* ==========================================
   5. CHARACTER PROFILE MODAL
========================================== */

const modal = document.getElementById("characterModal");

function openCharacter(index) {

    const character = characters[index];

    if (!character || !modal) return;

    document.getElementById("modalName").textContent =
        character.name;

    document.getElementById("modalRole").textContent =
        character.role;

    document.getElementById("modalDescription").textContent =
        character.description;

    modal.classList.add("active");

    modal.setAttribute("aria-hidden", "false");

}

function closeCharacter() {

    if (!modal) return;

    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");

}

const closeModal = document.getElementById("closeModal");

if (closeModal) {

    closeModal.addEventListener("click", closeCharacter);

}

if (modal) {

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeCharacter();
        }

    });

}

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeCharacter();
    }

});


/* ==========================================
   6. FLOATING GREEN PARTICLES
========================================== */

const particleContainer = document.getElementById("particles");

function createParticles() {

    if (!particleContainer) return;

    const particleCount =
        window.innerWidth < 768 ? 20 : 45;

    for (let i = 0; i < particleCount; i++) {

        const particle = document.createElement("span");

        particle.className = "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            (7 + Math.random() * 12) + "s";

        particle.style.animationDelay =
            (Math.random() * 10) + "s";

        particle.style.width =
            (2 + Math.random() * 3) + "px";

        particle.style.height =
            particle.style.width;

        particleContainer.appendChild(particle);

    }

}

createParticles();


/* ==========================================
   7. SCROLL REVEAL ANIMATION
========================================== */

const revealElements = document.querySelectorAll(
    ".section-heading, .story-layout, .character-card, .doom-content, .gallery-grid"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );

    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

}


/* ==========================================
   8. IMAGE ERROR HANDLING
========================================== */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

        img.classList.add("image-missing");

        console.warn(
            "Image could not be loaded:",
            img.getAttribute("src")
        );

    });

});


/* ==========================================
   9. PROJECT INITIALIZATION
========================================== */

console.log("--------------------------------");

console.log("DOOMSDAY WEBSITE INITIALIZED");

console.log("Cinematic experience ready.");

console.log("--------------------------------");


/* =====================================
   CINEMATIC AMBIENT SOUND SYSTEM
===================================== */

const ambientAudio = document.getElementById("ambientAudio");
const soundToggle = document.getElementById("soundToggle");
const soundIcon = document.getElementById("soundIcon");
const soundLabel = document.getElementById("soundLabel");

let soundEnabled = false;

if (soundToggle && ambientAudio) {

    ambientAudio.volume = 0.20;

    soundToggle.addEventListener("click", async () => {

        if (!soundEnabled) {

            try {

                await ambientAudio.play();

                soundEnabled = true;

                soundToggle.classList.add("active");
                soundToggle.setAttribute("aria-pressed", "true");

                soundIcon.textContent = "♫";
                soundLabel.textContent = "SOUND ON";

            } catch (error) {

                console.error("Audio playback failed:", error);

                soundLabel.textContent = "TRY AGAIN";
            }

        } else {

            ambientAudio.pause();

            soundEnabled = false;

            soundToggle.classList.remove("active");
            soundToggle.setAttribute("aria-pressed", "false");

            soundIcon.textContent = "♪";
            soundLabel.textContent = "SOUND OFF";

        }

    });

}

/* MARVEL INTRO CONTROLS */

const marvelIntro = document.getElementById("marvelIntro");
const marvelIntroVideo = document.getElementById("marvelIntroVideo");
const skipIntro = document.getElementById("skipIntro");
const enableIntroSound = document.getElementById("enableIntroSound");

function finishMarvelIntro() {
    if (!marvelIntro) return;

    marvelIntro.classList.add("hidden");

    if (marvelIntroVideo) {
        marvelIntroVideo.pause();
    }
}

if (marvelIntro && marvelIntroVideo && skipIntro) {

    marvelIntroVideo.addEventListener("ended", finishMarvelIntro);

    skipIntro.addEventListener("click", finishMarvelIntro);

    if (enableIntroSound) {
        enableIntroSound.addEventListener("click", async () => {
            try {
                marvelIntroVideo.muted = false;
                marvelIntroVideo.volume = 1;

                await marvelIntroVideo.play();

                enableIntroSound.classList.add("hidden");
            } catch (error) {
                console.error("Could not enable intro sound:", error);
            }
        });
    }
}
