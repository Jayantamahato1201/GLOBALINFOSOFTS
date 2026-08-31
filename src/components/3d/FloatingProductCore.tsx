import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Globe, Smartphone, Cloud, ArrowRight } from 'lucide-react';

interface TechPreset {
  id: string;
  name: string;
  tag: string;
  color: number;
  secondaryColor: number;
  icon: typeof Layers;
  description: string;
  stats: string;
}

const PRESETS: TechPreset[] = [
  {
    id: 'erp',
    name: 'Enterprise ERP & Core Systems',
    tag: 'Operational Intelligence',
    color: 0x6366f1, // Indigo
    secondaryColor: 0x818cf8,
    icon: Layers,
    description: 'High-throughput transactional engine with unified accounting, supply chain logistics, and real-time ledger orchestration.',
    stats: '45% Overhead Reduction'
  },
  {
    id: 'web',
    name: 'Modern Web & SaaS Engine',
    tag: 'Next-Gen Web Architecture',
    color: 0x818cf8, // Indigo-light
    secondaryColor: 0xa855f7,
    icon: Globe,
    description: 'Sub-second progressive web applications built with React 19, TypeScript, and micro-frontend architecture.',
    stats: '99.9% Speed Performance'
  },
  {
    id: 'mobile',
    name: 'Omni-Mobile Ecosystems',
    tag: 'iOS & Android Native Performance',
    color: 0x10b981, // Emerald
    secondaryColor: 0x6366f1,
    icon: Smartphone,
    description: 'Ultra-smooth mobile experiences with offline data persistence, biometrics, and real-time push events.',
    stats: '1.2M+ Daily Active Users'
  },
  {
    id: 'cloud',
    name: 'Cloud & Automated DevOps',
    tag: 'Zero-Downtime Infrastructure',
    color: 0x8b5cf6, // Violet
    secondaryColor: 0xec4899,
    icon: Cloud,
    description: 'Automated Kubernetes clusters, multi-region failover, and proactive security penetration defense.',
    stats: '99.99% Guaranteed SLA'
  }
];

export const FloatingProductCore: React.FC<{ className?: string; onSelectService?: (id: string) => void }> = ({
  className = '',
  onSelectService
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>('erp');
  const activePreset = PRESETS.find((p) => p.id === activeTab) || PRESETS[0];

  const meshRef = useRef<{
    cube?: THREE.Mesh;
    wireCube?: THREE.Mesh;
    satellites: THREE.Mesh[];
    innerSphere?: THREE.Mesh;
    light1?: THREE.PointLight;
    light2?: THREE.PointLight;
  }>({ satellites: [] });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central 3D Cube / Rounded geometry
    const boxGeo = new THREE.BoxGeometry(5.2, 5.2, 5.2, 3, 3, 3);
    const boxMat = new THREE.MeshStandardMaterial({
      color: activePreset.color,
      roughness: 0.2,
      metalness: 0.85,
      transparent: true,
      opacity: 0.85,
      wireframe: false
    });
    const cube = new THREE.Mesh(boxGeo, boxMat);
    rootGroup.add(cube);
    meshRef.current.cube = cube;

    // 2. Wireframe Cage
    const wireGeo = new THREE.BoxGeometry(6.4, 6.4, 6.4);
    const wireMat = new THREE.MeshBasicMaterial({
      color: activePreset.secondaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const wireCube = new THREE.Mesh(wireGeo, wireMat);
    rootGroup.add(wireCube);
    meshRef.current.wireCube = wireCube;

    // 3. Glowing Inner Sphere
    const sphereGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.9,
      emissive: activePreset.color,
      emissiveIntensity: 0.5
    });
    const innerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    rootGroup.add(innerSphere);
    meshRef.current.innerSphere = innerSphere;

    // 4. Orbiting Satellite Nodes
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.OctahedronGeometry(0.7, 0);

    for (let i = 0; i < 4; i++) {
      const satMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? activePreset.color : activePreset.secondaryColor,
        roughness: 0.3,
        metalness: 0.7
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      rootGroup.add(satMesh);
      satellites.push(satMesh);
    }
    meshRef.current.satellites = satellites;

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(activePreset.color, 4, 30);
    light1.position.set(10, 10, 12);
    scene.add(light1);
    meshRef.current.light1 = light1;

    const light2 = new THREE.PointLight(activePreset.secondaryColor, 3, 30);
    light2.position.set(-10, -10, 10);
    scene.add(light2);
    meshRef.current.light2 = light2;

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Main rotation
      rootGroup.rotation.x = time * 0.25;
      rootGroup.rotation.y = time * 0.35;

      wireCube.rotation.x = -time * 0.15;
      wireCube.rotation.z = time * 0.2;

      // Orbit satellites around cube
      satellites.forEach((sat, idx) => {
        const angle = time * 0.8 + (idx * Math.PI) / 2;
        const radius = 5.2 + Math.sin(time + idx) * 0.5;
        sat.position.x = Math.cos(angle) * radius;
        sat.position.y = Math.sin(angle * 1.3) * (radius * 0.6);
        sat.position.z = Math.sin(angle) * radius;
        sat.rotation.x = time * 2;
        sat.rotation.y = time * 1.5;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update 3D materials on preset switch
  useEffect(() => {
    if (meshRef.current.cube && meshRef.current.wireCube && meshRef.current.innerSphere) {
      (meshRef.current.cube.material as THREE.MeshStandardMaterial).color.setHex(activePreset.color);
      (meshRef.current.wireCube.material as THREE.MeshBasicMaterial).color.setHex(activePreset.secondaryColor);
      (meshRef.current.innerSphere.material as THREE.MeshStandardMaterial).emissive.setHex(activePreset.color);
      if (meshRef.current.light1) meshRef.current.light1.color.setHex(activePreset.color);
      if (meshRef.current.light2) meshRef.current.light2.color.setHex(activePreset.secondaryColor);
    }
  }, [activePreset]);

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-card-static rounded-3xl p-6 lg:p-10 shadow-2xl ${className}`}>
      {/* Interactive 3D Canvas Box */}
      <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[360px] lg:min-h-[420px] rounded-2xl bg-slate-950/50 border border-white/10 overflow-hidden group">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-mono text-indigo-300">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span>3D Architecture Matrix</span>
        </div>

        <div ref={containerRef} className="w-full h-full min-h-[360px]" />

        <div className="absolute bottom-4 right-4 z-10 text-[11px] text-slate-400 glass-card px-2.5 py-1 rounded-md">
          WebGL Live Shader
        </div>
      </div>

      {/* Preset Switcher & Descriptions */}
      <div className="lg:col-span-6 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-indigo-300 text-xs font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            <span>Interactive Digital Architecture</span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-['Outfit']">
            Engineered For Scale, Speed & Bulletproof Reliability
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Select a solution layer to inspect our architectural benchmarks and engineering stack:
          </p>
        </div>

        {/* Preset Tabs */}
        <div className="grid grid-cols-2 gap-2.5">
          {PRESETS.map((preset) => {
            const Icon = preset.icon;
            const isSelected = preset.id === activeTab;
            return (
              <button
                key={preset.id}
                id={`btn-preset-${preset.id}`}
                onClick={() => setActiveTab(preset.id)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-indigo-600/20 border border-indigo-500/60 text-white shadow-lg shadow-indigo-500/15 ring-1 ring-indigo-500/40 backdrop-blur-xl'
                    : 'glass-card text-slate-400 hover:text-slate-200'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-indigo-500/30 text-indigo-300' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate text-white">{preset.name.split(' ')[0]} {preset.name.split(' ')[1]}</div>
                  <div className="text-[11px] text-slate-400 truncate">{preset.tag}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Info */}
        <div className="p-5 rounded-2xl glass-card space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">{activePreset.tag}</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
              {activePreset.stats}
            </span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            {activePreset.description}
          </p>

          <div className="pt-2 flex items-center gap-4">
            <button
              id="btn-explore-layer-service"
              onClick={() => onSelectService?.(activePreset.id)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300 hover:text-indigo-200 transition-colors group/link"
            >
              <span>Explore full technical specs & deliverables</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
