import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HubPoint {
  name: string;
  lat: number;
  lng: number;
  type: string;
}

const HUBS: HubPoint[] = [
  { name: 'Bangalore HQ', lat: 12.9716, lng: 77.5946, type: 'Headquarters' },
  { name: 'Jamshedpur Center', lat: 22.8046, lng: 86.2029, type: 'Tech Delivery Hub' },
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194, type: 'North America Liaison' },
  { name: 'London', lat: 51.5074, lng: -0.1278, type: 'Client Operations' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, type: 'APAC Hub' },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, type: 'Oceania Operations' }
];

export const InteractiveTechGlobe: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Wireframe Sphere
    const sphereRadius = 7.5;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 36, 36);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globeMesh);

    // 2. Latitude and Longitude glowing Rings
    const ringGeo = new THREE.RingGeometry(sphereRadius + 0.1, sphereRadius + 0.2, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });
    const equatorRing = new THREE.Mesh(ringGeo, ringMat);
    equatorRing.rotation.x = Math.PI / 2;
    globeGroup.add(equatorRing);

    // 3. Helper to convert lat/lng to 3D Vector
    const latLngToVector3 = (lat: number, lng: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    // 4. Add Hub Pins and Glowing Pulses
    const pinGroup = new THREE.Group();
    globeGroup.add(pinGroup);

    const hubVectors: THREE.Vector3[] = [];

    HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, sphereRadius);
      hubVectors.push(pos);

      // Pin Head
      const pinGeo = new THREE.SphereGeometry(0.28, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: hub.type === 'Headquarters' ? 0x818cf8 : 0x6366f1
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      pinGroup.add(pinMesh);

      // Outer Beacon Ring
      const beaconGeo = new THREE.RingGeometry(0.35, 0.45, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: 0xa5b4fc,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      beaconMesh.position.copy(pos);
      beaconMesh.lookAt(new THREE.Vector3(0, 0, 0));
      pinGroup.add(beaconMesh);
    });

    // 5. Connecting Arcs
    const createArc = (v1: THREE.Vector3, v2: THREE.Vector3) => {
      const distance = v1.distanceTo(v2);
      const mid = v1.clone().add(v2).multiplyScalar(0.5);
      // Lift the midpoint away from sphere center
      mid.normalize().multiplyScalar(sphereRadius + distance * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      const points = curve.getPoints(40);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0x818cf8,
        transparent: true,
        opacity: 0.5
      });
      return new THREE.Line(curveGeo, curveMat);
    };

    // Connect HQ (Bangalore) to other hubs
    const hqPos = hubVectors[0];
    for (let i = 1; i < hubVectors.length; i++) {
      const arc = createArc(hqPos, hubVectors[i]);
      globeGroup.add(arc);
    }
    // Also connect SF to London
    if (hubVectors[2] && hubVectors[3]) {
      globeGroup.add(createArc(hubVectors[2], hubVectors[3]));
    }

    // 6. Dot Matrix Cloud around Globe
    const dotsCount = 450;
    const dotPositions = new Float32Array(dotsCount * 3);
    for (let i = 0; i < dotsCount; i++) {
      const i3 = i * 3;
      const lat = (Math.random() - 0.5) * 180;
      const lng = (Math.random() - 0.5) * 360;
      const vec = latLngToVector3(lat, lng, sphereRadius + (Math.random() * 0.2 - 0.1));
      dotPositions[i3] = vec.x;
      dotPositions[i3 + 1] = vec.y;
      dotPositions[i3 + 2] = vec.z;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0xc7d2fe,
      size: 0.18,
      transparent: true,
      opacity: 0.8
    });
    const dotPoints = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotPoints);

    // Initial globe tilt
    globeGroup.rotation.x = 0.3;
    globeGroup.rotation.y = 1.2;

    // Mouse Interaction for interactive spin
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

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
      if (!isDragging) {
        globeGroup.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative cursor-grab active:cursor-grabbing ${className}`}>
      <div ref={containerRef} className="w-full h-full min-h-[380px]" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full glass-card text-xs text-indigo-300 pointer-events-none flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
        <span>Drag to rotate 3D global network</span>
      </div>
    </div>
  );
};
