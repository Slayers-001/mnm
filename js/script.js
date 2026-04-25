/**
 * WINTER ENGINE v2.0
 * Engineered by PVP_PRO
 */

// --- 1. THREE.JS INITIALIZATION ---
const canvas = document.querySelector('#snow-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 5;

// --- 2. ADVANCED PARTICLE SYSTEM ---
const geometry = new THREE.BufferGeometry();
const count = 3000; // Increased density for "Premium" feel
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({
    size: 0.015,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const snowParticles = new THREE.Points(geometry, material);
scene.add(snowParticles);

// Animation Loop
function tick() {
    snowParticles.rotation.y += 0.0005;
    snowParticles.rotation.x += 0.0002;
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}
tick();

// --- 3. GSAP & INTERACTIVE SEQUENCING ---
const initBtn = document.getElementById('initBtn');
const audio = document.getElementById('bgMusic');
const mainCard = document.getElementById('mainCard');
const story = document.getElementById('story');

// Entrance Animation on Page Load
window.addEventListener('load', () => {
    gsap.to(mainCard, { 
        opacity: 1, 
        y: 0, 
        duration: 1.8, 
        ease: "expo.out" 
    });
});

// "Initiate Sequence" Trigger
initBtn.addEventListener('click', () => {
    // 1. Handle Audio with Error Catching
    audio.play().catch(() => console.log("User interaction required for audio."));

    // 2. Cinematic GSAP Timeline
    const tl = gsap.timeline();

    tl.to(initBtn, { 
        scale: 0.8, 
        opacity: 0, 
        duration: 0.6, 
        ease: "power3.in",
        onComplete: () => initBtn.style.display = 'none' 
    })
    .set(story, { display: "block", opacity: 0 })
    .to(story, { 
        opacity: 1, 
        duration: 2.5, 
        ease: "power2.out" 
    })
    .to(snowParticles.rotation, { 
        y: 0.01, 
        duration: 8, 
        ease: "sine.inOut" 
    }, "-=2"); // Start speeding up snow before text finishes

    // 3. Update Visuals (Cyber-Nexus Glow shift)
    gsap.to(".glass-card", { 
        borderColor: "rgba(0, 242, 255, 0.5)", 
        boxShadow: "0 0 60px rgba(0, 242, 255, 0.15)",
        duration: 2 
    });
});

// --- 4. WINDOW RESIZE HANDLER ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
