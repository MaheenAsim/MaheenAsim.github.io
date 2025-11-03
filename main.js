// Academic Portfolio JavaScript
// Handles animations, interactions, and data visualizations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticleBackground();
    initTypedText();
    initScrollReveal();
    initSkillsRadar();
    initMobileMenu();
    initSmoothScrolling();
    initTextSplitting();
});

// Particle background animation using p5.js
function initParticleBackground() {
    let particles = [];
    let canvas;
    
    new p5(function(p) {
        p.setup = function() {
            canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('particle-canvas');
            canvas.style('position', 'absolute');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '1');
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6),
                    opacity: p.random(0.3, 0.8)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            for (let particle of particles) {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(180, 130, 9, particle.opacity * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
                
                // Draw connections
                for (let other of particles) {
                    let distance = p.dist(particle.x, particle.y, other.x, other.y);
                    if (distance < 100) {
                        p.stroke(180, 130, 9, (1 - distance/100) * 50);
                        p.strokeWeight(1);
                        p.line(particle.x, particle.y, other.x, other.y);
                    }
                }
            }
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    });
}

// Typed text animation
function initTypedText() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Graduate Candidate in Computer Science',
            'Machine Learning Engineer',
            'Data Science Researcher',
            'AI & Ethics Advocate',
            'Statistical Analyst'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Skills radar chart using ECharts
function initSkillsRadar() {
    const chartDom = document.getElementById('skills-radar');
    const myChart = echarts.init(chartDom);
    
    const option = {
        title: {
            text: 'Technical Skills Assessment',
            left: 'center',
            textStyle: {
                color: '#1a2332',
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        radar: {
            indicator: [
                { name: 'Machine Learning', max: 100 },
                { name: 'Data Science', max: 100 },
                { name: 'Statistical Analysis', max: 100 },
                { name: 'Software Engineering', max: 100 },
                { name: 'Research Methods', max: 100 },
                { name: 'Deep Learning', max: 100 },
                { name: 'NLP', max: 100 },
                { name: 'Computer Vision', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 5,
            axisName: {
                color: '#374151',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: '#e5e7eb'
                }
            },
            splitArea: {
                show: false
            }
        },
        series: [{
            name: 'Skills',
            type: 'radar',
            data: [{
                value: [95, 92, 88, 85, 90, 82, 78, 75],
                name: 'Current Level',
                areaStyle: {
                    color: 'rgba(180, 83, 9, 0.2)'
                },
                lineStyle: {
                    color: '#b45309',
                    width: 2
                },
                itemStyle: {
                    color: '#b45309'
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };
    
    myChart.setOption(option);
    
    // Responsive chart
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle mobile menu (you can expand this functionality)
            console.log('Mobile menu clicked');
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Text splitting animation
function initTextSplitting() {
    // Initialize Splitting.js
    Splitting();
    
    // Animate split text
    const splitTextElements = document.querySelectorAll('[data-splitting]');
    
    splitTextElements.forEach((element, index) => {
        const chars = element.querySelectorAll('.char');
        
        anime({
            targets: chars,
            opacity: [0, 1],
            translateY: [50, 0],
            delay: (el, i) => (index * 500) + (i * 50),
            duration: 800,
            easing: 'easeOutExpo'
        });
    });
}

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const width = bar.style.width || bar.classList[1].replace('w-[', '').replace('%]', '') + '%';
        
        anime({
            targets: bar,
            width: width,
            duration: 1500,
            easing: 'easeOutExpo',
            delay: 200
        });
    });
}

// Research card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const researchCards = document.querySelectorAll('.research-card');
    
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                rotateX: 5,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateX: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
});

// Achievement badge animations
function animateAchievementBadges() {
    const badges = document.querySelectorAll('.achievement-badge');
    
    badges.forEach((badge, index) => {
        anime({
            targets: badge,
            scale: [0, 1],
            opacity: [0, 1],
            duration: 500,
            delay: index * 100,
            easing: 'easeOutBack'
        });
    });
}

// Scroll-triggered animations
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Navigation background on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-white/95');
        nav.classList.remove('bg-white/90');
    } else {
        nav.classList.add('bg-white/90');
        nav.classList.remove('bg-white/95');
    }
});

// Loading animation
window.addEventListener('load', function() {
    // Animate hero elements
    anime({
        targets: '.hero-bg .content-overlay > div',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        delay: 500,
        easing: 'easeOutExpo'
    });
    
    // Animate skill bars when they come into view
    const skillsSection = document.querySelector('#skills-radar');
    if (skillsSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(skillsSection);
    }
    
    // Animate achievement badges
    const achievementsSection = document.querySelector('.achievement-badge');
    if (achievementsSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateAchievementBadges();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(achievementsSection.parentElement);
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedResize = debounce(function() {
    // Handle resize events
    if (typeof myChart !== 'undefined') {
        myChart.resize();
    }
}, 250);

window.addEventListener('resize', debouncedResize);
/* =====  PARTICLE BACKGROUND  ===== */
const canvas=document.getElementById('particles'),ctx=canvas.getContext('2d'),particles=[];
let W=canvas.width=innerWidth,H=canvas.height=innerHeight;
function initParticles(){
  for(let i=0;i<120;i++) particles.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.5,opacity:Math.random()*.4});
}
function animateParticles(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(0,180,216,${p.opacity})`; ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
initParticles(); animateParticles();
addEventListener('resize',()=>{W=canvas.width=innerWidth;H=canvas.height=innerHeight;});

/* =====  TYPING TEXT  ===== */
const phrases=['Ph.D. Candidate','Data-Science Storyteller','Systems Optimizer','AI for Social Good'];
let idx=0,letter=0,current='',forward=true;
function type(){
  if(forward){ current=phrases[idx].slice(0,++letter); if(letter===phrases[idx].length){forward=false;setTimeout(type,1500);return;} }
  else{ current=phrases[idx].slice(0,--letter); if(letter===0){forward=true;idx=(idx+1)%phrases.length;} }
  document.getElementById('typed').textContent=current;
  setTimeout(type,forward?90:40);
}
type();