/* ==================================
   Portfolio JavaScript - Main Script
   ================================== */

// Initialize everything when page loads
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 800);
    }, 1200);

    try { initStarryBackground(); } catch (error) {
        console.error('Failed to initialize starry background:', error);
    }

    try {
        initAnimations();
        initEventListeners();
        initMouseInteractions();
        animateSkillBars();
        initTerminalEffect();
    } catch (error) {
        console.error('Error in initializing features:', error);
    }

    // Initialize GitHub Projects
    try {
        if (typeof initGitHubProjects === 'function') {
            initGitHubProjects();
        }
    } catch (error) {
        console.error('Failed to initialize GitHub projects:', error);
    }
});

/* ==================================
   Mouse Interactions & Custom Cursor
   ================================== */
let mouseX = 0, mouseY = 0;

function initMouseInteractions() {
    const cursor = document.querySelector('.cursor');
    const hoverElements = document.querySelectorAll('a, .btn, .card, .project-card, .hero-avatar, .tech-tag, .nav-toggle, .skill-item');

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(cursor, { duration: 0.1, left: mouseX - 10, top: mouseY - 10 });
    });

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        el.addEventListener('mousedown', () => cursor.classList.add('click'));
        el.addEventListener('mouseup', () => cursor.classList.remove('click'));
    });

    // Update starry camera on mouse move
    document.addEventListener('mousemove', (e) => {
        if (window.starsCamera) {
            const xPercent = (e.clientX / window.innerWidth) * 2 - 1;
            const yPercent = (e.clientY / window.innerHeight) * 2 - 1;
            gsap.to(window.starsCamera.rotation, {
                y: xPercent * 0.05,
                x: -yPercent * 0.05,
                duration: 1.5,
                ease: "power2.out"
            });
        }
    });
}

/* ==================================
   Three.js Starry Background
   ================================== */
function initStarryBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    window.starsCamera = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    document.getElementById('starry-bg').appendChild(renderer.domElement);

    const starCount = 800;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        starPositions[i3] = (Math.random() - 0.5) * 100;
        starPositions[i3 + 1] = (Math.random() - 0.5) * 100;
        starPositions[i3 + 2] = (Math.random() - 0.5) * 100;
        starSizes[i] = Math.random() * 0.05 + 0.01;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.PointsMaterial({
        size: 0.08,
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        vertexColors: false,
        sizeAttenuation: true
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Add a very bright sun
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Create bright radial gradient for intense sun
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');      // Bright white core
    gradient.addColorStop(0.1, 'rgba(255, 250, 200, 1)');    // Very bright yellow
    gradient.addColorStop(0.3, 'rgba(255, 220, 100, 0.9)');  // Bright yellow-orange
    gradient.addColorStop(0.6, 'rgba(255, 180, 50, 0.5)');   // Orange glow
    gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');        // Fade to transparent

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    const sunTexture = new THREE.CanvasTexture(canvas);
    const sunMaterial = new THREE.SpriteMaterial({
        map: sunTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 1.0  // Full opacity for maximum brightness
    });

    const sun = new THREE.Sprite(sunMaterial);
    sun.scale.set(35, 35, 1);  // Larger for more presence
    sun.position.set(-70, 40, -120);  // Position in distance
    scene.add(sun);

    camera.position.z = 50;

    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            starPositions[i3 + 2] += 0.02;
            if (starPositions[i3 + 2] > 50) starPositions[i3 + 2] -= 100;
        }

        starGeometry.attributes.position.needsUpdate = true;
        stars.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ==================================
   GSAP Scroll Animations
   ================================== */
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in sections
    gsap.utils.toArray('.fade-in').forEach((section) => {
        gsap.fromTo(section,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none",
                    once: true
                }
            }
        );
    });

    // Card animations
    gsap.utils.toArray('.card').forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 30, scale: 0.98 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    once: true
                }
            }
        );
    });

    // Hero section timeline
    const tl = gsap.timeline();
    tl.from('.hero-avatar', { scale: 0, duration: 1, ease: "back.out(1.5)" })
        .from('.hero-title', { opacity: 0, y: 40, duration: 0.8, ease: "power2.out" }, "-=0.4")
        .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" }, "-=0.4")
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" }, "-=0.3")
        .from('.social-grid', { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" }, "-=0.3");
}

/* ==================================
   Event Listeners & Interactions
   ================================== */
function initEventListeners() {
    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                navMenu.classList.remove('active');
            }
        });
    });

    // Progress bar on scroll
    const progressBar = document.querySelector('.progress-bar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    });

    // Ripple effect on buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 500);
        });
    });
}

/* ==================================
   Skill Bar Animations
   ================================== */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                gsap.to(bar, { width: width + '%', duration: 1.5, ease: "power2.out" });
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.1 });

    skillBars.forEach(bar => observer.observe(bar));
}

/* ==================================
   Terminal Typing Effect
   ================================== */
function initTerminalEffect() {
    const terminalText = document.querySelector('.terminal-text');
    if (!terminalText) return;

    const lines = [
        '$ whoami',
        '> dityakp',
        '$ cat interests.txt',
        '> DevOps | AWS Solutions | Cloud Computing',
        '$ status',
        '> Building the future, one cloud at a time...'
    ];

    let currentLine = 0;
    let currentChar = 0;
    let output = '';

    function typeLine() {
        if (currentLine >= lines.length) return;

        output += lines[currentLine][currentChar];
        terminalText.textContent = output;
        currentChar++;

        if (currentChar >= lines[currentLine].length) {
            output += '\n';
            currentChar = 0;
            currentLine++;
            setTimeout(typeLine, 400);
        } else {
            setTimeout(typeLine, 40);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeLine();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const terminal = document.querySelector('.terminal');
    if (terminal) observer.observe(terminal);
}

/* ==================================
   Contact Form Functionality
   ================================== */
// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const copyEmailBtn = document.getElementById('copy-email-btn');

    // Copy email button
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = 'aditya22may2004@gmail.com';

            try {
                await navigator.clipboard.writeText(email);
                copyEmailBtn.textContent = '✓ Email copied!';
                copyEmailBtn.style.borderColor = 'var(--success)';
                copyEmailBtn.style.color = 'var(--success)';

                setTimeout(() => {
                    copyEmailBtn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem;">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                        Copy Email
                    `;
                    copyEmailBtn.style.borderColor = '';
                    copyEmailBtn.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy email:', err);
                alert('Email: ' + email);
            }
        });
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            const isHuman = document.getElementById('contact-human').checked;

            // Validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }

            if (!isHuman) {
                showFormMessage('Please confirm you are human.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = document.getElementById('send-message-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                // Using FormSpree for form submission
                // Replace 'YOUR_FORM_ID' with your actual FormSpree form ID
                // Get free form ID at https://formspree.io/
                const response = await fetch('https://formspree.io/f/xwvnowvq', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                        _subject: `New message from ${name} via Portfolio`
                    })
                });

                if (response.ok) {
                    showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                showFormMessage('Failed to send message. Please email me directly at aditya22may2004@gmail.com', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 0.5rem;">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                `;
            }
        });
    }
}

function showFormMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = 'form-message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
        font-size: 0.95rem;
        animation: slideIn 0.3s ease;
        background: ${type === 'success' ? 'rgba(6, 214, 160, 0.1)' : 'rgba(247, 37, 133, 0.1)'};
        border: 1px solid ${type === 'success' ? 'var(--success)' : 'var(--accent)'};
        color: ${type === 'success' ? 'var(--success)' : 'var(--accent)'};
    `;

    const formActions = document.querySelector('.form-actions');
    formActions.parentNode.insertBefore(messageEl, formActions.nextSibling);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}
