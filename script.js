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

    const photos = [

        "assets/images/photo1.jpg",
        "assets/images/photo2.jpg",
        "assets/images/photo3.jpg",
        "assets/images/photo4.jpg",
        "assets/images/photo5.jpg",
        "assets/images/photo6.jpg",
        "assets/images/photo7.jpg"

    ];


    const captions = [

        "❤️ This is where our beautiful love story began.",
        "✨ Every moment with you became my favorite memory. ",
        "🌸 The day I realized I never wanted to lose you.",
        "💜 Thank you for always choosing me.",
        "😊 My favorite smile will be always yours.",
        "🥰 Thank you for an unforgetable first year.",
        "❤️ To many more anniversaries with you."

    ];


    let currentPhoto = 0;

    let teddyTimer = null;

    let photoChanging = false;

    musicBtn.onclick = () => {

        if(bgMusic.paused){

            bgMusic.play();

            musicBtn.innerHTML = "🔊 Music";

        }else{

            bgMusic.pause();

            musicBtn.innerHTML = "🔇 Muted";

        }

    };

    gift.onclick = () => {

        intro.classList.add("hidden");

        envelope.classList.remove("hidden");


        bgMusic.volume = 0;

        bgMusic.play().catch(error => {

            console.log(
                "Music couldn't start:",
                error
            );

        });


        // Smooth fade in

        let volume = 0;

        const fade = setInterval(() => {

            if(volume < 1){

                volume += 0.02;

                bgMusic.volume =
                    Math.min(volume, 1);

            }else{

                clearInterval(fade);

            }

        },100);

    };


    // ==========================================
    // YES BUTTON
    // ==========================================

    yesBtn.onclick = () => {

        envelope.classList.add("hidden");

        letter.classList.remove("hidden");


        // ==========================================
        // TYPEWRITER MESSAGE
        // NO AUTO SCROLL
        // ==========================================

        const text = `Hello to my beautiful Palangga,

        Happy 1st Anniversary po! ❤️

        First of all, from the bottom of my heart, I want to thank you for loving me and for always staying by my side. 
        
        Thank you for every smile, every laugh, and every beautiful memory we have shared together.

        One year may sound short to others, but for me, it has been a meaningful journey nga puno og love, happiness, and lessons. 
        
        You have become my safe place, my happiness, my best friend, and the person I want to share my future with uban atung usa ka dosena nga anak HAHAHA.

        kidding aside, I know we are not perfect, and there are times when we misunderstand each other or have disagreements over small things, away diri, away didto. 
       
        But despite those moments, I promise to keep choosing you, understanding you, and loving you with all my heart. 
       
        I want us to continue growing together and facing every challenges hand in hand.

        Thank you for being part of my life and for giving me so many reasons to smile. 
        
        Unta daghan pa tag mga good memories mahimo together, celebrating more anniversaries, and loving you even more as time goes by.

        No matter what happens, I hope you always remember how special you are to me.

        Happy 1st Anniversary, Palangga!

        I love you so much, today and always. ❤️`;

        message.innerHTML = "";

        // Manatili sa current scroll position
        message.scrollTop = 0;

        let i = 0;

        const typing = setInterval(() => {

            message.innerHTML += text.charAt(i);

            i++;

            if(i >= text.length){

                clearInterval(typing);

                // Idagdag lang ang closing pagkatapos matapos mag-type
                message.innerHTML += `

        <div class="letter-closing">
            <div>Forever yours,</div>
            <div>Joverth ❤️</div>
        </div>`;

            }

        }, 40);

    };


    // ==========================================
    // DONE READING BUTTON
    // ==========================================

    doneBtn.onclick = () => {

        letter.classList.add("hidden");


        // Start fireworks

        fireworkShow();


        // Wait for fireworks before showing gallery

        setTimeout(() => {

            gallery.classList.remove("hidden");

            gallery.style.display = "flex";

            gallery.style.opacity = "1";

            currentPhoto = 0;

            showPhoto();

        },9000);

    };


    // ==========================================
    // RUNAWAY NO BUTTON
    // ==========================================

    const funnyTexts = [

        "No 😜",
        "Catch me! 😂",
        "Read it, please 😭",
        "Basaha na ba! 🥹",
        "Press YES 💜"

    ];


    let current = 0;


    noBtn.addEventListener("mouseover", () => {

        const x =
            Math.random() *
            (window.innerWidth - 140);

        const y =
            Math.random() *
            (window.innerHeight - 80);


        noBtn.style.position = "fixed";

        noBtn.style.left =
            x + "px";

        noBtn.style.top =
            y + "px";


        noBtn.textContent =
            funnyTexts[current];


        current++;


        if(current >= funnyTexts.length){

            current = 0;

        }

    });


    // ==========================================
    // MEMORY GALLERY
    // ==========================================

    function showPhoto(){

        if(photoChanging){
            return;
        }


        photoChanging = true;


        // Cancel old teddy timer

        if(teddyTimer){

            clearTimeout(teddyTimer);

            teddyTimer = null;

        }


        // Remove final-photo styling

        gallery.classList.remove("last-photo");


        // Fade out current photo

        galleryImage.style.opacity = "0";

        galleryImage.style.transform =
            "scale(.96)";


        galleryCaption.style.opacity = "0";

        galleryCaption.style.transform =
            "translateY(10px)";


        setTimeout(() => {

            // Remove Photo 1 special class

            galleryImage.classList.remove(
                "photo-one"
            );


            // Make Photo 1 slightly larger

            if(currentPhoto === 0){

                galleryImage.classList.add(
                    "photo-one"
                );

            }


            // Set image

            galleryImage.src =
                photos[currentPhoto];


            // Set caption

            galleryCaption.innerHTML =
                captions[currentPhoto];


            // Set counter

            photoCounter.innerHTML =
                `${currentPhoto + 1} / ${photos.length}`;


            // Wait for image to load

            galleryImage.onload = () => {

                galleryImage.style.opacity =
                    "1";

                galleryImage.style.transform =
                    "scale(1)";


                // Caption appears after photo

                setTimeout(() => {

                    galleryCaption.style.opacity =
                        "1";

                    galleryCaption.style.transform =
                        "translateY(0)";

                },350);


                photoChanging = false;


                // ==========================================
                // LAST PHOTO
                // ==========================================

                if(
                    currentPhoto ===
                    photos.length - 1
                ){

                    gallery.classList.add(
                        "last-photo"
                    );


                    // Show teddy after 3 seconds

                    teddyTimer = setTimeout(() => {

                        showTeddy();

                    },3000);

                }

            };


            // Fallback if image is already cached

            if(galleryImage.complete){

                galleryImage.style.opacity =
                    "1";

                galleryImage.style.transform =
                    "scale(1)";


                setTimeout(() => {

                    galleryCaption.style.opacity =
                        "1";

                    galleryCaption.style.transform =
                        "translateY(0)";

                },350);


                photoChanging = false;


                if(
                    currentPhoto ===
                    photos.length - 1
                ){

                    gallery.classList.add(
                        "last-photo"
                    );


                    teddyTimer = setTimeout(() => {

                        showTeddy();

                    },3000);

                }

            }

        },450);

    }


    // ==========================================
    // NEXT BUTTON
    // ==========================================

    nextBtn.onclick = () => {

        // Do not go beyond last photo

        if(
            currentPhoto <
            photos.length - 1
        ){

            currentPhoto++;

            showPhoto();

        }

    };


    // ==========================================
    // PREVIOUS BUTTON
    // ==========================================

    prevBtn.onclick = () => {

        // Cancel teddy transition

        if(teddyTimer){

            clearTimeout(teddyTimer);

            teddyTimer = null;

        }


        // Go back if possible

        if(currentPhoto > 0){

            currentPhoto--;

            showPhoto();

        }

    };


    // ==========================================
    // TEDDY BEAR TRANSITION
    // ==========================================

    function showTeddy(){

        // Prevent duplicate transition

        if(
            teddySection.classList.contains(
                "teddy-visible"
            )
        ){

            return;

        }


        // Fade out gallery

        gallery.style.transition =
            "opacity 1.5s ease";

        gallery.style.opacity = "0";


        setTimeout(() => {

            // Hide gallery completely

            gallery.classList.add("hidden");

            gallery.style.display = "none";


            // Show teddy

            teddySection.classList.remove(
                "hidden"
            );

            teddySection.classList.add(
                "teddy-visible"
            );

            teddySection.style.display =
                "flex";

            teddySection.style.opacity =
                "0";


            // Small delay before fade-in

            setTimeout(() => {

                teddySection.style.transition =
                    "opacity 2s ease";

                teddySection.style.opacity =
                    "1";

            },100);

        },1500);

    }


    // ==========================================
    // REPLAY OUR MEMORIES
    // ==========================================

    replayBtn.onclick = () => {

        // Cancel teddy timer

        if(teddyTimer){

            clearTimeout(teddyTimer);

            teddyTimer = null;

        }


        // Hide Teddy

        teddySection.classList.add(
            "hidden"
        );

        teddySection.classList.remove(
            "teddy-visible"
        );

        teddySection.style.display =
            "none";

        teddySection.style.opacity =
            "0";


        // Show Gallery again

        gallery.classList.remove(
            "hidden"
        );

        gallery.classList.remove(
            "last-photo"
        );

        gallery.style.display =
            "flex";

        gallery.style.opacity =
            "1";

        gallery.style.transition =
            "none";


        // Start from Photo 1

        currentPhoto = 0;

        showPhoto();

    };


    // ==========================================
    // FLOATING HEARTS
    // ==========================================

    const hearts =
        document.getElementById("hearts");


    setInterval(() => {

        const heart =
            document.createElement("div");


        heart.innerHTML =
            Math.random() > 0.5
                ? "💜"
                : "💗";


        heart.style.position =
            "absolute";


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.top =
            "100%";


        heart.style.fontSize =
            (20 + Math.random() * 25) + "px";


        heart.style.transition =
            "6s linear";


        hearts.appendChild(heart);


        setTimeout(() => {

            heart.style.transform =
                "translateY(-120vh) rotate(360deg)";

            heart.style.opacity =
                "0";

        },100);


        setTimeout(() => {

            heart.remove();

        },6000);


    },300);

});


// =====================================
// TWINKLING STARS
// =====================================

const stars =
    document.getElementById("stars");


for(let i = 0; i < 120; i++){

    const star =
        document.createElement("div");


    star.className =
        "star";


    star.innerHTML =
        "✦";


    star.style.left =
        Math.random() * 100 + "%";


    star.style.top =
        Math.random() * 100 + "%";


    star.style.fontSize =
        (4 + Math.random() * 8) + "px";


    star.style.animationDelay =
        Math.random() * 3 + "s";


    stars.appendChild(star);

}


// ==========================================
// FIREWORKS
// ==========================================

const canvas =
    document.getElementById("fireworks");


const ctx =
    canvas.getContext("2d");


canvas.width =
    window.innerWidth;


canvas.height =
    window.innerHeight;


window.addEventListener("resize", () => {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

});


let particles = [];


class Particle{

    constructor(x,y,color){

        this.x = x;

        this.y = y;


        this.radius =
            Math.random() * 3 + 2;


        this.color =
            color;


        this.speedX =
            (Math.random() - 0.5) * 8;


        this.speedY =
            (Math.random() - 0.5) * 8;


        this.alpha = 1;

    }


    update(){

        this.x +=
            this.speedX;

        this.y +=
            this.speedY;


        this.speedY +=
            0.03;


        this.alpha -=
            0.012;

    }


    draw(){

        ctx.save();


        ctx.globalAlpha =
            this.alpha;


        ctx.beginPath();


        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            this.color;


        ctx.fill();


        ctx.restore();

    }

}


// ==========================================
// EXPLOSION
// ==========================================

function explode(x,y){

    const colors = [

        "#ff69b4",
        "#d946ef",
        "#9333ea",
        "#fde047",
        "#ffffff"

    ];


    for(let i = 0; i < 120; i++){

        particles.push(

            new Particle(

                x,

                y,

                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ]

            )

        );

    }

}


// ==========================================
// FIREWORK ANIMATION
// ==========================================

function animateFireworks(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach((p,index) => {

        p.update();

        p.draw();


        if(p.alpha <= 0){

            particles.splice(
                index,
                1
            );

        }

    });


    requestAnimationFrame(
        animateFireworks
    );

}


animateFireworks();


// ==========================================
// FIREWORK SHOW
// ==========================================

function fireworkShow(){

    let count = 0;


    const interval =
        setInterval(() => {

            explode(

                Math.random() *
                canvas.width,

                Math.random() *
                canvas.height *
                0.6

            );


            count++;


            if(count >= 25){

                clearInterval(
                    interval
                );

            }

        },350);

}