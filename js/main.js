console.log("Time Capsule Landing Page Loaded");
// HOME PAGE BUTTONS ONLY
document.getElementById("btnLogin")?.addEventListener("click", () => {
    window.location.href = "login.html";
});

document.getElementById("btnRegister")?.addEventListener("click", () => {
    window.location.href = "register.html";
});
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let w, h;
let flakes = [];

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Snowflake {
    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.r = Math.random() * 3 + 1;
        this.d = Math.random() * 1;
        this.speed = Math.random() * 1 + 0.5;
    }

    fall() {
        this.y += this.speed;
        if (this.y > h) {
            this.y = -10;
            this.x = Math.random() * w;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fill();
    }
}

// create snowflakes
for (let i = 0; i < 120; i++) {
    flakes.push(new Snowflake());
}

function animateSnow() {
    ctx.clearRect(0, 0, w, h);
    flakes.forEach(flake => {
        flake.fall();
        flake.draw();
    });
    requestAnimationFrame(animateSnow);
}

animateSnow();
