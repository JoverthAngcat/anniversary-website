document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("intro");
    const envelope = document.getElementById("envelope");
    const letter = document.getElementById("letter");
    const gift = document.getElementById("gift");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const message = document.getElementById("message");
    const doneBtn = document.getElementById("doneBtn");
    const bgMusic = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");
    const gallery = document.getElementById("gallery");
    const galleryImage = document.getElementById("galleryImage");
    const galleryCaption = document.getElementById("galleryCaption");
    const photoCounter = document.getElementById("photoCounter");
    const teddySection = document.getElementById("teddySection");
    const replayBtn = document.getElementById("replayBtn");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const hearts = document.getElementById("hearts");

    const photos = [
        "photo1.jpg",
        "photo2.jpg",
        "photo3.jpg",
        "photo4.jpg",
        "photo5.jpg",
        "photo6.jpg",
        "photo7.jpg"
    ];

    const captions = [
        "❤️ This is where our beautiful love story began.",
        "✨ Every moment with you became my favorite memory.",
        "🌸 The day I realized I never wanted to lose you.",
        "💜 Thank you for always choosing me.",
        "😊 My favorite smile will be always yours.",
        "🥰 Thank you for an unforgettable first year.",
        "❤️ To many more anniversaries with you."
    ];

    let currentPhoto = 0;
    let teddyTimer = null;
    let photoChanging = false;
    let musicFadeTimer = null;
    let typingTimer = null;
    let currentFunnyText = 0;

    const funnyTexts = [
        "No 😜",
        "Catch me! 😂",
        "Read it, please 😭",
        "Basaha na ba! 🥹",
        "Press YES 💜"
    ];

    function updateMusicButton() {
        if (!musicBtn || !bgMusic) return;

        musicBtn.innerHTML = bgMusic.paused
            ? "🔇 Muted"
            : "🔊 Music";
    }

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener("click", async () => {
            if (bgMusic.paused) {
                try {
                    await bgMusic.play();
                    musicBtn.innerHTML = "🔊 Music";
                } catch (error) {
                    console.error("Music could not play:", error);
                    musicBtn.innerHTML = "▶️ Play Music";
                }
            } else {
                bgMusic.pause();
                musicBtn.innerHTML = "🔇 Muted";
            }
        });

        bgMusic.addEventListener("play", updateMusicButton);
        bgMusic.addEventListener("pause", updateMusicButton);
    }

    if (gift && intro && envelope && bgMusic) {
        gift.addEventListener("click", async () => {
            intro.classList.add("hidden");
            envelope.classList.remove("hidden");

            if (musicFadeTimer) {
                clearInterval(musicFadeTimer);
                musicFadeTimer = null;
            }

            bgMusic.volume = 0;

            try {
                await bgMusic.play();

                let volume = 0;

                musicFadeTimer = setInterval(() => {
                    volume = Math.min(volume + 0.02, 1);
                    bgMusic.volume = volume;

                    if (volume >= 1) {
                        clearInterval(musicFadeTimer);
                        musicFadeTimer = null;
                    }
                }, 100);
            } catch (error) {
                console.error("Music could not start:", error);

                if (musicBtn) {
                    musicBtn.innerHTML = "▶️ Play Music";
                }
            }
        });
    }

    if (yesBtn) {
        yesBtn.addEventListener("click", () => {
            if (envelope) envelope.classList.add("hidden");
            if (letter) letter.classList.remove("hidden");
            if (!message) return;

            const text = `Hello to my beautiful Palangga,

Happy 1st Anniversary po! ❤️

First of all, from the bottom of my heart, I want to thank you for loving me and for always staying by my side.

Thank you for every smile, every laugh, and every beautiful memory we have shared together.

One year may sound short to others, but for me, it has been a meaningful journey nga puno og love, happiness, and lessons.

You have become my safe place, my happiness, my best friend, and the person I want to share my future with uban atung usa ka dosena nga anak HAHAHA.

Kidding aside, I know we are not perfect, and there are times when we misunderstand each other or have disagreements over small things, away diri, away didto.

But despite those moments, I promise to keep choosing you, understanding you, and loving you with all my heart.

I want us to continue growing together and facing every challenge hand in hand.

Thank you for being part of my life and for giving me so many reasons to smile.

Unta daghan pa tag mga good memories mahimo together, celebrating more anniversaries, and loving you even more as time goes by.

No matter what happens, I hope you always remember how special you are to me.

Happy 1st Anniversary, Palangga!

I love you so much, today and always. ❤️`;

            if (typingTimer) {
                clearInterval(typingTimer);
                typingTimer = null;
            }

            message.innerHTML = "";
            message.scrollTop = 0;

            let i = 0;

            typingTimer = setInterval(() => {
                message.textContent += text.charAt(i);
                i++;

                if (i >= text.length) {
                    clearInterval(typingTimer);
                    typingTimer = null;

                    const closing = document.createElement("div");
                    closing.className = "letter-closing";

                    const line1 = document.createElement("div");
                    line1.textContent = "Forever yours,";

                    const line2 = document.createElement("div");
                    line2.textContent = "Joverth ❤️";

                    closing.appendChild(line1);
                    closing.appendChild(line2);
                    message.appendChild(closing);
                }
            }, 40);
        });
    }

    if (doneBtn) {
        doneBtn.addEventListener("click", () => {
            if (letter) letter.classList.add("hidden");

            fireworkShow();

            setTimeout(() => {
                if (!gallery) return;

                gallery.classList.remove("hidden");
                gallery.style.display = "flex";
                gallery.style.opacity = "1";

                if (teddySection) {
                    teddySection.classList.add("hidden");
                    teddySection.classList.remove("teddy-visible");
                    teddySection.style.display = "none";
                    teddySection.style.opacity = "0";
                }

                currentPhoto = 0;
                showPhoto();
            }, 9000);
        });
    }

    if (noBtn) {
        noBtn.addEventListener("mouseover", () => {
            const maxX = Math.max(0, window.innerWidth - noBtn.offsetWidth);
            const maxY = Math.max(0, window.innerHeight - noBtn.offsetHeight);

            noBtn.style.position = "fixed";
            noBtn.style.left = Math.random() * maxX + "px";
            noBtn.style.top = Math.random() * maxY + "px";
            noBtn.textContent = funnyTexts[currentFunnyText];

            currentFunnyText = (currentFunnyText + 1) % funnyTexts.length;
        });
    }

    function showPhoto() {
        if (photoChanging) return;
        if (!galleryImage || !galleryCaption || !photoCounter || !gallery) return;

        photoChanging = true;

        if (teddyTimer) {
            clearTimeout(teddyTimer);
            teddyTimer = null;
        }

        gallery.classList.remove("last-photo");

        galleryImage.style.opacity = "0";
        galleryImage.style.transform = "scale(.96)";
        galleryCaption.style.opacity = "0";
        galleryCaption.style.transform = "translateY(10px)";

        setTimeout(() => {
            galleryImage.classList.remove("photo-one");

            if (currentPhoto === 0) {
                galleryImage.classList.add("photo-one");
            }

            galleryCaption.textContent = captions[currentPhoto];
            photoCounter.textContent = `${currentPhoto + 1} / ${photos.length}`;

            let handled = false;

            const finishLoading = () => {
                if (handled) return;
                handled = true;

                galleryImage.style.opacity = "1";
                galleryImage.style.transform = "scale(1)";

                setTimeout(() => {
                    galleryCaption.style.opacity = "1";
                    galleryCaption.style.transform = "translateY(0)";
                }, 350);

                photoChanging = false;

                if (currentPhoto === photos.length - 1) {
                    gallery.classList.add("last-photo");

                    teddyTimer = setTimeout(() => {
                        showTeddy();
                    }, 3000);
                }
            };

            galleryImage.onload = finishLoading;

            galleryImage.onerror = () => {
                if (handled) return;
                handled = true;

                photoChanging = false;
                galleryImage.style.opacity = "1";
                galleryImage.style.transform = "scale(1)";

                galleryCaption.textContent =
                    "Sorry, this photo could not be loaded. Please check the filename in your repository.";

                console.error("Unable to load gallery image:", photos[currentPhoto]);
            };

            galleryImage.src = photos[currentPhoto];

            if (galleryImage.complete && galleryImage.naturalWidth > 0) {
                finishLoading();
            }
        }, 450);
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentPhoto < photos.length - 1 && !photoChanging) {
                currentPhoto++;
                showPhoto();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentPhoto > 0 && !photoChanging) {
                if (teddyTimer) {
                    clearTimeout(teddyTimer);
                    teddyTimer = null;
                }

                currentPhoto--;
                showPhoto();
            }
        });
    }

    function showTeddy() {
        if (!gallery || !teddySection) return;

        if (teddySection.classList.contains("teddy-visible")) {
            return;
        }

        gallery.style.transition = "opacity 1.5s ease";
        gallery.style.opacity = "0";

        setTimeout(() => {
            gallery.classList.add("hidden");
            gallery.style.display = "none";

            teddySection.classList.remove("hidden");
            teddySection.classList.add("teddy-visible");
            teddySection.style.display = "flex";
            teddySection.style.opacity = "0";

            setTimeout(() => {
                teddySection.style.transition = "opacity 2s ease";
                teddySection.style.opacity = "1";
            }, 100);
        }, 1500);
    }

    if (replayBtn) {
        replayBtn.addEventListener("click", () => {
            if (teddyTimer) {
                clearTimeout(teddyTimer);
                teddyTimer = null;
            }

            if (teddySection) {
                teddySection.classList.add("hidden");
                teddySection.classList.remove("teddy-visible");
                teddySection.style.display = "none";
                teddySection.style.opacity = "0";
            }

            if (gallery) {
                gallery.classList.remove("hidden", "last-photo");
                gallery.style.display = "flex";
                gallery.style.opacity = "1";
                gallery.style.transition = "none";
            }

            currentPhoto = 0;
            photoChanging = false;
            showPhoto();
        });
    }

    if (hearts) {
        setInterval(() => {
            const heart = document.createElement("div");

            heart.textContent = Math.random() > 0.5 ? "💜" : "💗";
            heart.style.position = "absolute";
            heart.style.left = Math.random() * 100 + "%";
            heart.style.top = "100%";
            heart.style.fontSize = 20 + Math.random() * 25 + "px";
            heart.style.transition = "6s linear";

            hearts.appendChild(heart);

            setTimeout(() => {
                heart.style.transform = "translateY(-120vh) rotate(360deg)";
                heart.style.opacity = "0";
            }, 100);

            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, 300);
    }
});

const stars = document.getElementById("stars");

if (stars) {
    for (let i = 0; i < 120; i++) {
        const star = document.createElement("div");

        star.className = "star";
        star.textContent = "✦";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.fontSize = 4 + Math.random() * 8 + "px";
        star.style.animationDelay = Math.random() * 3 + "s";

        stars.appendChild(star);
    }
}

const canvas = document.getElementById("fireworks");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

let particles = [];

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 3 + 2;
        this.color = color;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.alpha = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.03;
        this.alpha -= 0.012;
    }

    draw() {
        if (!ctx) return;

        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

function explode(x, y) {
    const colors = [
        "#ff69b4",
        "#d946ef",
        "#9333ea",
        "#fde047",
        "#ffffff"
    ];

    for (let i = 0; i < 120; i++) {
        particles.push(
            new Particle(
                x,
                y,
                colors[Math.floor(Math.random() * colors.length)]
            )
        );
    }
}

function animateFireworks() {
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter((particle) => {
        particle.update();
        particle.draw();
        return particle.alpha > 0;
    });

    requestAnimationFrame(animateFireworks);
}

animateFireworks();

function fireworkShow() {
    if (!canvas || !ctx) return;

    let count = 0;

    const interval = setInterval(() => {
        explode(
            Math.random() * canvas.width,
            Math.random() * canvas.height * 0.6
        );

        count++;

        if (count >= 25) {
            clearInterval(interval);
        }
    }, 350);
}