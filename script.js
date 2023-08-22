const canvas = document.querySelector('.sketch');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = '#f1f1f1';

class Particle {

    constructor(effect) {
        this.effect = effect;
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.size = Math.random() * 3 + 1;
        this.vx = Math.random() * 3 - 1.5;
        this.vy = Math.random() * 3 - 1.5;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y , this.size, 0, Math.PI * 2);
        context.fill();
    }   

    update() {
        this.x += this.vx;
        if (this.x > this.effect.width - this.size || this.x < this.size) this.vx *= -1; 

        this.y += this.vy;
        if (this.y > this.effect.height - this.size || this.y < this.size) this.vy *= -1;
    }

}

class Effect {

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.particlesNos = 250;
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < this.particlesNos; i++) {
            this.particles.push(new Particle(this));
        }
    }

    handleParticles() {
        this.connectParticles();
        this.particles.forEach(particle => {
            particle.draw(this.ctx);
            particle.update();
        });
    }

    clearPrevious() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    connectParticles() {
        const maxDistance = 90;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.hypot(dx, dy);

                if (distance < maxDistance) {
                    const opacity = 1 - (distance / maxDistance);
                    this.ctx.save();
                    this.ctx.globalAlpha = opacity;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = '#f1f1f1';
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }

}

const effect = new Effect(canvas, ctx);


function animate() {
    effect.clearPrevious();
    effect.handleParticles();
    requestAnimationFrame(animate);
}

animate();
