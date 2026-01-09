let mouse = {
    x: null,
    y: null,
    radius: 120
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
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

const neonColors = [
    "rgba(0,255,255,0.9)",
    "rgba(79,70,255,0.9)",
    "rgba(183, 6, 253, 0.9)",
    "rgba(233, 110, 250, 0.9)",
    "rgba(0,255,170,0.9)",
    "rgba(243, 239, 8, 0.9)",
    "rgba(255, 128, 0, 0.9)",
    "rgba(250, 20, 8, 0.9)",
    "rgba(254, 255, 255, 0.9)"
];

class Snowflake {
    constructor() {
        this.y = Math.random() * h;

        // size based on height (depth effect)
        this.r = this.y / h * 3 + 1;  // bottom = bigger
        this.speed = this.y / h * 2 + 0.6;

        this.x = Math.random() * w;
        this.color = neonColors[Math.floor(Math.random() * neonColors.length)];
        this.dx = 0;
        this.dy = this.speed;

    }

    interact() {
        if (!mouse.x || !mouse.y) return;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.dx += (dx / distance) * force * 0.6;
        }
    }

    fall() {
        this.interact();

        this.y += this.dy;
        this.x += this.dx;

        // friction
        this.dx *= 0.92;

        // reset
        if (this.y > h) {
            this.y = -10;
            this.x = Math.random() * w;
            this.dx = 0;
        }
        if (this.x > w) this.x = 0;
        if (this.x < 0) this.x = w;
    }

draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.r * 6;  // glow depends on size
    ctx.shadowColor = this.color;
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
