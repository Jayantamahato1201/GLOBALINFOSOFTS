import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Product3DModelConfig, SubsystemHotspot } from '../../data/product3DModelsData';

interface Product3DCanvasProps {
  modelConfig: Product3DModelConfig;
  renderMode: 'solid' | 'wireframe' | 'xray';
  exploded: boolean;
  explodeAmount: number;
  autoRotate: boolean;
  activeHotspotId: string | null;
  cameraPreset: 'iso' | 'top' | 'front' | 'core';
  onSelectHotspot: (hotspot: SubsystemHotspot | null) => void;
  className?: string;
}

interface ProjectedHotspot {
  hotspot: SubsystemHotspot;
  x: number;
  y: number;
  visible: boolean;
}

export const Product3DCanvas: React.FC<Product3DCanvasProps> = ({
  modelConfig,
  renderMode,
  exploded,
  explodeAmount,
  autoRotate,
  activeHotspotId,
  cameraPreset,
  onSelectHotspot,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [projectedHotspots, setProjectedHotspots] = useState<ProjectedHotspot[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // References for Three.js internals
  const stateRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    rootGroup?: THREE.Group;
    layerGroups: { group: THREE.Group; baseOffset: number }[];
    materials: THREE.Material[];
    rotSpeedX: number;
    rotSpeedY: number;
    targetRotX: number;
    targetRotY: number;
    isDragging: boolean;
    lastMouseX: number;
    lastMouseY: number;
    currentDistance: number;
    targetDistance: number;
    lights: THREE.Light[];
    pulseMeshes: THREE.Mesh[];
  }>({
    layerGroups: [],
    materials: [],
    rotSpeedX: 0,
    rotSpeedY: 0,
    targetRotX: 0.35,
    targetRotY: 0.55,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    currentDistance: 17,
    targetDistance: 17,
    lights: [],
    pulseMeshes: []
  });

  // Helper to build procedural 3D models based on product ID
  const buildModelGeometry = useCallback((scene: THREE.Scene, config: Product3DModelConfig, mode: 'solid' | 'wireframe' | 'xray') => {
    const root = new THREE.Group();
    const layerGroups: { group: THREE.Group; baseOffset: number }[] = [];
    const materials: THREE.Material[] = [];
    const pulseMeshes: THREE.Mesh[] = [];

    // Helper material generator
    const getMaterial = (color: number, isWire = false, opacity = 0.85, metal = 0.8, rough = 0.2) => {
      let mat: THREE.Material;
      if (mode === 'wireframe' || isWire) {
        mat = new THREE.MeshBasicMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: mode === 'wireframe' ? 0.75 : 0.35
        });
      } else if (mode === 'xray') {
        mat = new THREE.MeshPhysicalMaterial({
          color,
          transmission: 0.9,
          opacity: 0.65,
          transparent: true,
          roughness: 0.1,
          metalness: 0.1,
          wireframe: false
        });
      } else {
        // Solid PBR
        mat = new THREE.MeshStandardMaterial({
          color,
          roughness: rough,
          metalness: metal,
          transparent: opacity < 1,
          opacity
        });
      }
      materials.push(mat);
      return mat;
    };

    // 1. Model: ERP & FinTech Monolith
    if (config.id === 'erp-core') {
      // 4 Tier Platforms
      const tierSizes = [
        { w: 7.2, h: 0.6, d: 7.2, y: -2.4, color: 0x4f46e5 },
        { w: 6.0, h: 0.6, d: 6.0, y: -0.8, color: 0x6366f1 },
        { w: 4.8, h: 0.6, d: 4.8, y: 0.8, color: 0x818cf8 },
        { w: 3.6, h: 0.5, d: 3.6, y: 2.4, color: 0x38bdf8 }
      ];

      tierSizes.forEach((tier, i) => {
        const group = new THREE.Group();
        group.position.y = tier.y;

        const boxGeo = new THREE.BoxGeometry(tier.w, tier.h, tier.d, 2, 1, 2);
        const box = new THREE.Mesh(boxGeo, getMaterial(tier.color, false, 0.88, 0.85, 0.25));
        group.add(box);

        const wireGeo = new THREE.BoxGeometry(tier.w + 0.08, tier.h + 0.08, tier.d + 0.08);
        const wire = new THREE.Mesh(wireGeo, getMaterial(tier.color, true));
        group.add(wire);

        // Corner pillar accents
        const pillarGeo = new THREE.CylinderGeometry(0.12, 0.12, tier.h * 1.5, 12);
        const corners = [
          [tier.w / 2 - 0.3, 0, tier.d / 2 - 0.3],
          [-tier.w / 2 + 0.3, 0, tier.d / 2 - 0.3],
          [tier.w / 2 - 0.3, 0, -tier.d / 2 + 0.3],
          [-tier.w / 2 + 0.3, 0, -tier.d / 2 + 0.3]
        ];
        corners.forEach(([cx, cy, cz]) => {
          const pillar = new THREE.Mesh(pillarGeo, getMaterial(0x38bdf8, false, 0.9, 0.9, 0.1));
          pillar.position.set(cx, cy, cz);
          group.add(pillar);
        });

        root.add(group);
        layerGroups.push({ group, baseOffset: tier.y });
      });

      // Central Spinning Crystal Core (Ledger Core)
      const coreGeo = new THREE.OctahedronGeometry(1.6, 0);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x6366f1,
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.1
      });
      materials.push(coreMat);
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.y = 0;
      root.add(core);
      pulseMeshes.push(core);

      // Rotating Token Rings
      const ringGeo = new THREE.TorusGeometry(3.6, 0.06, 16, 64);
      const ringMat = getMaterial(0x38bdf8, false, 0.7);
      const ring1 = new THREE.Mesh(ringGeo, ringMat);
      ring1.rotation.x = Math.PI / 2.5;
      root.add(ring1);
      pulseMeshes.push(ring1);
    }

    // 2. Model: Web & SaaS Engine
    else if (config.id === 'web-saas') {
      // Floating Browser Frame / Glass UI Plane (Top Layer)
      const uiGroup = new THREE.Group();
      uiGroup.position.y = 2.2;
      const screenGeo = new THREE.BoxGeometry(6.5, 3.8, 0.2);
      const screen = new THREE.Mesh(screenGeo, getMaterial(0x60a5fa, false, 0.75, 0.7, 0.15));
      uiGroup.add(screen);

      // UI Window header dots
      for (let d = 0; d < 3; d++) {
        const dotGeo = new THREE.SphereGeometry(0.12, 12, 12);
        const dotColor = d === 0 ? 0xf87171 : d === 1 ? 0xfbbf24 : 0x34d399;
        const dot = new THREE.Mesh(dotGeo, getMaterial(dotColor, false, 1.0, 0.5, 0.2));
        dot.position.set(-2.8 + d * 0.4, 1.55, 0.15);
        uiGroup.add(dot);
      }

      root.add(uiGroup);
      layerGroups.push({ group: uiGroup, baseOffset: 2.2 });

      // API Gateway Ring (Middle Layer)
      const gatewayGroup = new THREE.Group();
      gatewayGroup.position.y = 0.4;
      const torusGeo = new THREE.TorusGeometry(3.2, 0.25, 16, 48);
      const gatewayTorus = new THREE.Mesh(torusGeo, getMaterial(0x3b82f6, false, 0.85, 0.8, 0.2));
      gatewayTorus.rotation.x = Math.PI / 2;
      gatewayGroup.add(gatewayTorus);

      // Microservice cubes around the ring
      for (let s = 0; s < 6; s++) {
        const angle = (s * Math.PI * 2) / 6;
        const microGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
        const micro = new THREE.Mesh(microGeo, getMaterial(0x818cf8, false, 0.9, 0.8, 0.2));
        micro.position.set(Math.cos(angle) * 3.2, 0, Math.sin(angle) * 3.2);
        gatewayGroup.add(micro);
      }
      root.add(gatewayGroup);
      layerGroups.push({ group: gatewayGroup, baseOffset: 0.4 });

      // Database Shards & Redis Caching Base (Bottom Layer)
      const dbGroup = new THREE.Group();
      dbGroup.position.y = -2.0;

      for (let db = 0; db < 4; db++) {
        const cylGeo = new THREE.CylinderGeometry(0.9, 0.9, 1.2, 24);
        const cyl = new THREE.Mesh(cylGeo, getMaterial(0xa855f7, false, 0.85, 0.85, 0.2));
        const pos = [
          [-1.5, 0, -1.5],
          [1.5, 0, -1.5],
          [-1.5, 0, 1.5],
          [1.5, 0, 1.5]
        ][db];
        cyl.position.set(pos[0], pos[1], pos[2]);
        dbGroup.add(cyl);
      }
      root.add(dbGroup);
      layerGroups.push({ group: dbGroup, baseOffset: -2.0 });
    }

    // 3. Model: Mobile FinTech Platform
    else if (config.id === 'mobile-fintech') {
      // 3D Phone Chassis
      const phoneGroup = new THREE.Group();
      phoneGroup.position.y = 0;

      const bodyGeo = new THREE.BoxGeometry(4.2, 7.8, 0.4);
      const body = new THREE.Mesh(bodyGeo, getMaterial(0x10b981, false, 0.8, 0.9, 0.1));
      phoneGroup.add(body);

      // Glass Screen
      const screenGeo = new THREE.BoxGeometry(3.9, 7.4, 0.05);
      const screenMat = getMaterial(0x34d399, false, 0.85, 0.9, 0.1);
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.z = 0.22;
      phoneGroup.add(screen);

      // Biometric Sensor Rings
      const bioGeo = new THREE.TorusGeometry(0.9, 0.06, 16, 32);
      const bio = new THREE.Mesh(bioGeo, getMaterial(0x6ee7b7, false, 0.9, 0.9, 0.1));
      bio.position.set(0, 0, 0.3);
      phoneGroup.add(bio);
      pulseMeshes.push(bio);

      // Native Bridge Chips floating
      const chipGeo = new THREE.BoxGeometry(1.4, 1.4, 0.2);
      const chip = new THREE.Mesh(chipGeo, getMaterial(0x6366f1, false, 0.9, 0.8, 0.2));
      chip.position.set(0, 1.8, 0.35);
      phoneGroup.add(chip);

      root.add(phoneGroup);
      layerGroups.push({ group: phoneGroup, baseOffset: 0 });

      // Floating NFC Waves
      const nfcGroup = new THREE.Group();
      nfcGroup.position.y = 2.4;
      for (let w = 1; w <= 3; w++) {
        const waveGeo = new THREE.TorusGeometry(w * 0.9, 0.05, 12, 32, Math.PI / 1.5);
        const wave = new THREE.Mesh(waveGeo, getMaterial(0x34d399, false, 0.7 - w * 0.15));
        wave.rotation.z = Math.PI / 6;
        wave.position.z = 0.5;
        nfcGroup.add(wave);
      }
      root.add(nfcGroup);
      layerGroups.push({ group: nfcGroup, baseOffset: 2.4 });
    }

    // 4. Model: AI Neural Cluster
    else if (config.id === 'ai-cognitive') {
      // Central Tensor Matrix Crystal
      const tensorGroup = new THREE.Group();
      tensorGroup.position.y = 0;
      const crystalGeo = new THREE.IcosahedronGeometry(2.0, 1);
      const crystalMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.9
      });
      materials.push(crystalMat);
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      tensorGroup.add(crystal);
      pulseMeshes.push(crystal);
      root.add(tensorGroup);
      layerGroups.push({ group: tensorGroup, baseOffset: 0 });

      // Synaptic Neural Node Tiers (Top & Bottom Layers)
      const topNeuralGroup = new THREE.Group();
      topNeuralGroup.position.y = 2.4;
      for (let n = 0; n < 6; n++) {
        const angle = (n * Math.PI * 2) / 6;
        const nodeGeo = new THREE.SphereGeometry(0.45, 16, 16);
        const node = new THREE.Mesh(nodeGeo, getMaterial(0xa78bfa, false, 0.9, 0.8, 0.2));
        node.position.set(Math.cos(angle) * 3.0, 0, Math.sin(angle) * 3.0);
        topNeuralGroup.add(node);

        // Synapse line connecting to center
        const lineGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.2, 8);
        const line = new THREE.Mesh(lineGeo, getMaterial(0x8b5cf6, false, 0.6));
        line.position.set(Math.cos(angle) * 1.5, -1.2, Math.sin(angle) * 1.5);
        line.lookAt(0, 0, 0);
        line.rotateX(Math.PI / 2);
        topNeuralGroup.add(line);
      }
      root.add(topNeuralGroup);
      layerGroups.push({ group: topNeuralGroup, baseOffset: 2.4 });

      // Vector Embedding Base
      const vectorGroup = new THREE.Group();
      vectorGroup.position.y = -2.4;
      const discGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.5, 32);
      const disc = new THREE.Mesh(discGeo, getMaterial(0x7c3aed, false, 0.85, 0.8, 0.2));
      vectorGroup.add(disc);

      const ringGeo = new THREE.TorusGeometry(4.2, 0.08, 16, 48);
      const ring = new THREE.Mesh(ringGeo, getMaterial(0xec4899, false, 0.8));
      ring.rotation.x = Math.PI / 2;
      vectorGroup.add(ring);

      root.add(vectorGroup);
      layerGroups.push({ group: vectorGroup, baseOffset: -2.4 });
    }

    // 5. Model: Cloud DevOps Mesh
    else if (config.id === 'cloud-mesh') {
      // Ingress WAF & Load Balancer (Top)
      const ingressGroup = new THREE.Group();
      ingressGroup.position.y = 2.4;
      const ingressGeo = new THREE.TorusGeometry(3.4, 0.2, 16, 48);
      const ingress = new THREE.Mesh(ingressGeo, getMaterial(0x38bdf8, false, 0.85, 0.8, 0.2));
      ingress.rotation.x = Math.PI / 2;
      ingressGroup.add(ingress);
      root.add(ingressGroup);
      layerGroups.push({ group: ingressGroup, baseOffset: 2.4 });

      // Kubernetes Cluster Nodes (Middle)
      const k8sGroup = new THREE.Group();
      k8sGroup.position.y = 0;
      const podPositions = [
        [-1.8, 0, -1.8],
        [1.8, 0, -1.8],
        [-1.8, 0, 1.8],
        [1.8, 0, 1.8],
        [0, 0, 0]
      ];
      podPositions.forEach(([px, py, pz], idx) => {
        const podGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        const pod = new THREE.Mesh(podGeo, getMaterial(0x0ea5e9, false, 0.85, 0.8, 0.2));
        pod.position.set(px, py, pz);
        k8sGroup.add(pod);

        // Status beacon
        const beaconGeo = new THREE.SphereGeometry(0.18, 12, 12);
        const beacon = new THREE.Mesh(beaconGeo, getMaterial(idx === 4 ? 0x10b981 : 0x38bdf8, false, 1.0));
        beacon.position.set(px, py + 0.8, pz);
        k8sGroup.add(beacon);
      });
      root.add(k8sGroup);
      layerGroups.push({ group: k8sGroup, baseOffset: 0 });

      // Multi-AZ Storage Base
      const storageGroup = new THREE.Group();
      storageGroup.position.y = -2.4;
      const baseGeo = new THREE.BoxGeometry(7.0, 0.6, 7.0);
      const base = new THREE.Mesh(baseGeo, getMaterial(0x0284c7, false, 0.85, 0.8, 0.2));
      storageGroup.add(base);
      root.add(storageGroup);
      layerGroups.push({ group: storageGroup, baseOffset: -2.4 });
    }

    // 6. Model: Retail POS
    else {
      // Screen & Barcode Head (Top)
      const headGroup = new THREE.Group();
      headGroup.position.y = 1.8;
      const screenGeo = new THREE.BoxGeometry(4.8, 2.8, 0.3);
      const screen = new THREE.Mesh(screenGeo, getMaterial(0xfbbf24, false, 0.85, 0.8, 0.2));
      screen.rotation.x = -Math.PI / 8;
      headGroup.add(screen);

      // Scanner laser cone
      const coneGeo = new THREE.ConeGeometry(1.8, 2.2, 16, 1, true);
      const cone = new THREE.Mesh(coneGeo, getMaterial(0xf87171, true, 0.4));
      cone.position.set(0, -1.2, 1.2);
      cone.rotation.x = Math.PI / 4;
      headGroup.add(cone);

      root.add(headGroup);
      layerGroups.push({ group: headGroup, baseOffset: 1.8 });

      // POS Engine & Cash Drawer Base (Bottom)
      const baseGroup = new THREE.Group();
      baseGroup.position.y = -1.6;
      const bodyGeo = new THREE.BoxGeometry(5.8, 1.8, 5.8);
      const body = new THREE.Mesh(bodyGeo, getMaterial(0xd97706, false, 0.88, 0.8, 0.2));
      baseGroup.add(body);

      // Receipt Slot
      const slotGeo = new THREE.BoxGeometry(2.4, 0.1, 0.4);
      const slot = new THREE.Mesh(slotGeo, getMaterial(0x10b981, false, 1.0));
      slot.position.set(0, 0.95, -1.2);
      baseGroup.add(slot);

      root.add(baseGroup);
      layerGroups.push({ group: baseGroup, baseOffset: -1.6 });
    }

    scene.add(root);
    return { root, layerGroups, materials, pulseMeshes };
  }, []);

  // Main Three.js Initialization
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId: number | null = null;
    let resizeObserver: ResizeObserver | null = null;

    try {
      const width = Math.max(container.clientWidth || 600, 1);
      const height = Math.max(container.clientHeight || 500, 1);

      // 1. Scene
      const scene = new THREE.Scene();
      stateRef.current.scene = scene;

      // 2. Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, stateRef.current.currentDistance);
      stateRef.current.camera = camera;

      // 3. Renderer
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'default' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = false;
      container.appendChild(renderer.domElement);
      stateRef.current.renderer = renderer;

      // 4. Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(modelConfig.themeColor, 3.5);
      mainLight.position.set(10, 15, 12);
      scene.add(mainLight);

      const rimLight = new THREE.PointLight(modelConfig.accentColor, 3.0, 30);
      rimLight.position.set(-10, -10, 10);
      scene.add(rimLight);

      stateRef.current.lights = [ambientLight, mainLight, rimLight];

      // 5. Build Model
      const built = buildModelGeometry(scene, modelConfig, renderMode);
      stateRef.current.rootGroup = built.root;
      stateRef.current.layerGroups = built.layerGroups;
      stateRef.current.materials = built.materials;
      stateRef.current.pulseMeshes = built.pulseMeshes;

      // 6. Resize Handler
      const handleResize = () => {
        try {
          if (!container || !camera || !renderer) return;
          const w = Math.max(container.clientWidth || 600, 1);
          const h = Math.max(container.clientHeight || 500, 1);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        } catch {
          // ignore
        }
      };

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);
      }

      // 7. Render Animation Loop
      const clock = new THREE.Clock();

      const animate = () => {
        try {
          if (!renderer) return;
          animId = requestAnimationFrame(animate);
          const dt = clock.getDelta();
          const elapsed = clock.getElapsedTime();

          // Camera distance lerp
          stateRef.current.currentDistance += (stateRef.current.targetDistance - stateRef.current.currentDistance) * 0.08;
          camera.position.z = stateRef.current.currentDistance;

          // Auto-rotation when not dragging
          if (autoRotate && !stateRef.current.isDragging) {
            stateRef.current.targetRotY += dt * 0.45;
          }

          // Smooth rotation dampening
          if (stateRef.current.rootGroup) {
            stateRef.current.rootGroup.rotation.x += (stateRef.current.targetRotX - stateRef.current.rootGroup.rotation.x) * 0.1;
            stateRef.current.rootGroup.rotation.y += (stateRef.current.targetRotY - stateRef.current.rootGroup.rotation.y) * 0.1;

            // Pulse animations
            stateRef.current.pulseMeshes.forEach((mesh, idx) => {
              mesh.rotation.y = elapsed * (0.8 + idx * 0.3);
              const scale = 1 + Math.sin(elapsed * 2 + idx) * 0.04;
              mesh.scale.set(scale, scale, scale);
            });

            // Exploded View layer positioning
            stateRef.current.layerGroups.forEach(({ group, baseOffset }) => {
              const targetY = exploded ? baseOffset * (1 + explodeAmount * 1.2) : baseOffset;
              group.position.y += (targetY - group.position.y) * 0.1;
            });
          }

          renderer.render(scene, camera);

          // Project Hotspots to 2D screen coords
          if (container && camera && stateRef.current.rootGroup) {
            const widthHalf = (container.clientWidth || 600) / 2;
            const heightHalf = (container.clientHeight || 500) / 2;

            const projected: ProjectedHotspot[] = modelConfig.hotspots.map((hs) => {
              const vec = new THREE.Vector3(...hs.position);
              // Apply root group rotation and offset
              vec.applyEuler(stateRef.current.rootGroup!.rotation);
              vec.project(camera);

              const isBehind = vec.z > 1;
              const sx = vec.x * widthHalf + widthHalf;
              const sy = -(vec.y * heightHalf) + heightHalf;

              return {
                hotspot: hs,
                x: sx,
                y: sy,
                visible: !isBehind && sx >= 0 && sx <= container.clientWidth && sy >= 0 && sy <= container.clientHeight
              };
            });

            setProjectedHotspots(projected);
          }
        } catch {
          // gracefully stop loop on error
        }
      };

      animate();
    } catch (e) {
      console.warn('Product3DCanvas WebGL fallback activated:', e);
    }

    return () => {
      try {
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        if (animId !== null) {
          cancelAnimationFrame(animId);
        }
        if (renderer && renderer.domElement) {
          if (renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
          renderer.dispose();
        }
        stateRef.current.materials.forEach((m) => m.dispose());
      } catch {
        // ignore cleanup errors
      }
    };
  }, [modelConfig.id, renderMode, buildModelGeometry]);

  // Handle Preset Camera Changes
  useEffect(() => {
    if (cameraPreset === 'iso') {
      stateRef.current.targetRotX = 0.4;
      stateRef.current.targetRotY = 0.6;
      stateRef.current.targetDistance = 17;
    } else if (cameraPreset === 'top') {
      stateRef.current.targetRotX = Math.PI / 2.1;
      stateRef.current.targetRotY = 0;
      stateRef.current.targetDistance = 16;
    } else if (cameraPreset === 'front') {
      stateRef.current.targetRotX = 0;
      stateRef.current.targetRotY = 0;
      stateRef.current.targetDistance = 15;
    } else if (cameraPreset === 'core') {
      stateRef.current.targetRotX = 0.2;
      stateRef.current.targetRotY = 0.8;
      stateRef.current.targetDistance = 10;
    }
  }, [cameraPreset]);

  // Handle Active Hotspot Focus
  useEffect(() => {
    if (activeHotspotId) {
      const found = modelConfig.hotspots.find((h) => h.id === activeHotspotId);
      if (found) {
        // Zoom slightly to inspect hotspot
        stateRef.current.targetDistance = 12.5;
      }
    }
  }, [activeHotspotId, modelConfig.hotspots]);

  // Mouse & Touch Drag Controls
  const handlePointerDown = (e: React.PointerEvent) => {
    stateRef.current.isDragging = true;
    stateRef.current.lastMouseX = e.clientX;
    stateRef.current.lastMouseY = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!stateRef.current.isDragging) return;
    const deltaX = e.clientX - stateRef.current.lastMouseX;
    const deltaY = e.clientY - stateRef.current.lastMouseY;

    stateRef.current.targetRotY += deltaX * 0.008;
    stateRef.current.targetRotX += deltaY * 0.008;

    // Clamp X rotation to prevent flipping upside down
    stateRef.current.targetRotX = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, stateRef.current.targetRotX));

    stateRef.current.lastMouseX = e.clientX;
    stateRef.current.lastMouseY = e.clientY;
  };

  const handlePointerUp = () => {
    stateRef.current.isDragging = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    stateRef.current.targetDistance = Math.max(7, Math.min(28, stateRef.current.targetDistance + e.deltaY * 0.02));
  };

  return (
    <div
      ref={canvasWrapperRef}
      className={`relative w-full h-full min-h-[380px] lg:min-h-[500px] select-none touch-none overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Floating 3D Hotspot Badges & Interaction Pins */}
      {projectedHotspots.map(({ hotspot, x, y, visible }) => {
        if (!visible) return null;
        const isActive = activeHotspotId === hotspot.id;

        return (
          <div
            key={hotspot.id}
            style={{
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'auto'
            }}
            className="z-20 group"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectHotspot(isActive ? null : hotspot);
              }}
              aria-label={`Inspect ${hotspot.name}`}
              className={`relative flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'scale-125'
                  : 'hover:scale-115'
              }`}
            >
              {/* Pulsing ring */}
              <span
                className={`absolute w-8 h-8 rounded-full animate-ping opacity-75 ${
                  isActive ? 'bg-indigo-400' : 'bg-cyan-400'
                }`}
              />
              <span
                className={`relative w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono shadow-xl border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-white ring-2 ring-indigo-400'
                    : 'bg-slate-900/90 text-indigo-300 border-indigo-500/50 backdrop-blur-md'
                }`}
              >
                +
              </span>
            </button>

            {/* Quick Preview Tooltip */}
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl glass-panel text-left pointer-events-none transition-all duration-200 ${
                isActive || isHovered
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-1 scale-95'
              }`}
            >
              <div className="text-[10px] font-mono font-semibold text-indigo-300 uppercase tracking-wider">
                {hotspot.category}
              </div>
              <div className="text-xs font-bold text-white line-clamp-1">
                {hotspot.name}
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating Drag Hint Indicator */}
      <div className="absolute top-4 right-4 pointer-events-none z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-[11px] text-slate-300 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        <span>360° Interactive Canvas • Drag to Orbit</span>
      </div>
    </div>
  );
};
