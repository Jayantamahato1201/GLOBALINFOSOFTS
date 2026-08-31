import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Complex 3D Geometry (Wireframe Icosahedron + Inner Core)
    const icoGeometry = new THREE.IcosahedronGeometry(8, 2);
    const icoMaterial = new THREE.MeshStandardMaterial({
      color: 0x6366f1, // Indigo
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      roughness: 0.2,
      metalness: 0.8
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    mainGroup.add(icosahedron);

    // Inner glowing sphere/torus
    const innerGeometry = new THREE.TorusKnotGeometry(4.5, 0.9, 128, 32);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x818cf8, // Indigo-light
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      roughness: 0.1,
      metalness: 0.9
    });
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
    mainGroup.add(innerCore);

    // 2. Orbital Rings
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    const createRing = (radius: number, color: number, tiltX: number, tiltY: number) => {
      const ringGeo = new THREE.RingGeometry(radius, radius + 0.12, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = tiltX;
      ring.rotation.y = tiltY;
      ringGroup.add(ring);
      return ring;
    };

    const ring1 = createRing(13, 0x6366f1, Math.PI / 3, 0.2);
    const ring2 = createRing(16, 0xa855f7, -Math.PI / 4, 0.4);
    const ring3 = createRing(19, 0x818cf8, Math.PI / 6, -0.3);

    // 3. Floating 3D Star / Data Particles
    const particlesCount = 180;
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleScales = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      const radius = 10 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i3 + 2] = radius * Math.cos(phi);

      particleScales[i] = Math.random() * 0.8 + 0.2;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    // Particle Material
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xa5b4fc,
      size: 0.35,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 3.5, 60);
    pointLight1.position.set(15, 15, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 3, 60);
    pointLight2.position.set(-15, -15, 15);
    scene.add(pointLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Group rotation
      mainGroup.rotation.y = elapsedTime * 0.12 + targetX * 0.45;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.08) * 0.15 - targetY * 0.35;

      // Inner Core rotation
      innerCore.rotation.x = elapsedTime * 0.25;
      innerCore.rotation.y = elapsedTime * 0.35;

      // Icosahedron rotation
      icosahedron.rotation.x = -elapsedTime * 0.1;
      icosahedron.rotation.z = elapsedTime * 0.08;

      // Rings spin
      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.15;
      ring3.rotation.z = elapsedTime * 0.1;

      // Particles subtle pulse
      particles.rotation.y = -elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
