import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const DomeGallery = ({ items = [] }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const spheresRef = useRef([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create spheres for gallery items
    const spheres = [];
    const radius = 3;
    const itemCount = Math.min(items.length, 8);

    for (let i = 0; i < itemCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / itemCount);
      const theta = Math.sqrt(itemCount * Math.PI) * phi;

      const geometry = new THREE.SphereGeometry(0.3, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(i / itemCount, 0.7, 0.5),
        transparent: true,
        opacity: 0.8,
      });

      const sphere = new THREE.Mesh(geometry, material);

      sphere.position.x = radius * Math.cos(theta) * Math.sin(phi);
      sphere.position.y = radius * Math.sin(theta) * Math.sin(phi);
      sphere.position.z = radius * Math.cos(phi);

      sphere.userData = { item: items[i], index: i };
      spheres.push(sphere);
      scene.add(sphere);
    }

    spheresRef.current = spheres;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate camera slowly
      camera.position.x = Math.cos(Date.now() * 0.0005) * 5;
      camera.position.z = Math.sin(Date.now() * 0.0005) * 5;
      camera.lookAt(0, 0, 0);

      // Rotate spheres
      spheres.forEach((sphere, index) => {
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;

      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [items]);

  return (
    <div className="relative w-full h-96">
      <div ref={mountRef} className="w-full h-full rounded-lg overflow-hidden" />

      {/* Overlay with item info */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-lg font-bold mb-2">Interactive 3D Gallery</h3>
        <p className="text-sm text-white/70">
          Hover over the spheres to explore different projects and experiences.
        </p>
      </motion.div>
    </div>
  );
};

export default DomeGallery;
