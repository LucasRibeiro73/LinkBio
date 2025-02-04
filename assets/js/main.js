// Animação suave dos cards de link
function animateLinks() {
  const links = document.querySelectorAll('.link-card');
  links.forEach((link, index) => {
    link.style.animationDelay = `${index * 100}ms`;
  });
}

// Efeito de paralaxe 3D no cartão de perfil
function setupParallax() {
  const profile = document.querySelector('.profile');
  const maxRotation = 5;

  document.addEventListener('mousemove', (e) => {
    if (!profile) return;

    const rect = profile.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const percentX = (e.clientX - centerX) / (window.innerWidth / 2);
    const percentY = (e.clientY - centerY) / (window.innerHeight / 2);
    
    const rotateX = -percentY * maxRotation;
    const rotateY = percentX * maxRotation;
    
    profile.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });

  // Reset na saída
  document.addEventListener('mouseleave', () => {
    if (!profile) return;
    profile.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
}

// Sistema de partículas interativas
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    
    document.body.appendChild(this.canvas);
    
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle(x, y) {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      size: Math.random() * 3 + 1,
      color: Math.random() > 0.5 ? '#6366f1' : '#ec4899',
      life: 1
    };
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.color}${Math.floor(p.life * 255).toString(16).padStart(2, '0')}`;
      this.ctx.fill();
      
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
    
    requestAnimationFrame(() => this.update());
  }

  addParticles(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(x, y));
    }
  }
}

// Efeito de hover nas tecnologias
function setupTechHover() {
  const techIcons = document.querySelectorAll('.tech-icon');
  const colors = {
    'React': '#61dafb',
    'Node.js': '#339933',
    'JavaScript': '#f7df1e',
    'Python': '#3776ab',
    'AWS': '#ff9900',
    'Docker': '#2496ed',
    'HTML': '#ff8800',
    'CSS': '#0000ff'
  };

  techIcons.forEach(icon => {
    const tech = icon.getAttribute('data-tech');
    const iconElement = icon.querySelector('i');
    
    icon.addEventListener('mouseenter', () => {
      if (colors[tech]) {
        iconElement.style.color = colors[tech];
      }
    });
    
    icon.addEventListener('mouseleave', () => {
      iconElement.style.color = '';
    });
  });
}

// Animação dos cards de expertise
function setupExpertiseCards() {
  const cards = document.querySelectorAll('.expertise-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
  });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  animateLinks();
  setupParallax();
  setupTechHover();
  setupExpertiseCards();
  
  const particleSystem = new ParticleSystem();
  particleSystem.update();
  
  // Adicionar partículas no hover dos links
  document.querySelectorAll('.link-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      particleSystem.addParticles(e.clientX, e.clientY, 2);
    });
  });
});

// Easter egg no console
console.log(
  '%cWelcome to my portfolio! 🚀\nLet\'s create something amazing together!',
  'color: #6366f1; font-size: 20px; font-weight: bold;'
);