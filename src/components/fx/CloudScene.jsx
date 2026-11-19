import { useEffect, useRef } from "react";
import * as THREE from "three";

// [x, y, z, radius] of the spheres that make up the cloud
const PUFFS = [
  [0, 0.1, 0, 1.45],
  [-1.35, -0.2, 0.1, 1.05],
  [1.4, -0.15, 0, 1.15],
  [-0.6, 0.65, -0.1, 1.1],
  [0.75, 0.8, 0.1, 1.0],
  [-2.1, -0.5, 0, 0.72],
  [2.2, -0.5, 0, 0.76],
  [0.1, -0.45, 0.5, 1.2],
  [-1.0, -0.5, 0.4, 0.92],
  [1.1, -0.55, 0.4, 0.92],
];

const LOOK = {
  dark: { cloud: 0xd6e8ff, emissive: 0x1b96ff, glow: 0.3, halo: 0.6, ground: 0x0b3a7a, ambient: 0.9 },
  light: { cloud: 0xffffff, emissive: 0x9ccbff, glow: 0.1, halo: 0.28, ground: 0x9cc4f5, ambient: 1.5 },
};

function haloTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(27,150,255,1)");
  grad.addColorStop(0.45, "rgba(27,150,255,0.25)");
  grad.addColorStop(1, "rgba(27,150,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

function boltGeometry() {
  const s = new THREE.Shape();
  [
    [0.3, 1.15],
    [-0.5, -0.1],
    [-0.02, -0.1],
    [-0.3, -1.15],
    [0.55, 0.2],
    [0.06, 0.2],
  ].forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.2,
    bevelEnabled: true,
    bevelSize: 0.04,
    bevelThickness: 0.04,
    bevelSegments: 3,
  });
  geo.center();
  return geo;
}

// A glowing cloud with a lightning bolt and orbiting points. It leans toward the pointer.
export default function CloudScene({ theme = "dark", animate = true }) {
  const mount = useRef(null);
  const applyTheme = useRef(null);

  useEffect(() => {
    applyTheme.current?.(theme);
  }, [theme]);

  useEffect(() => {
    const el = mount.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // no WebGL: the CSS fallback behind this canvas stays visible
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    const root = new THREE.Group();
    scene.add(root);

    // halo behind the cloud
    const haloTex = haloTexture();
    const haloMat = new THREE.SpriteMaterial({ map: haloTex, transparent: true, depthWrite: false });
    const halo = new THREE.Sprite(haloMat);
    halo.scale.setScalar(7.5);
    halo.position.z = -2;
    scene.add(halo);

    // cloud
    const cloudMat = new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.02 });
    const sphere = new THREE.SphereGeometry(1, 48, 32);
    const cloud = new THREE.Group();
    const puffs = PUFFS.map(([x, y, z, r]) => {
      const m = new THREE.Mesh(sphere, cloudMat);
      m.position.set(x, y, z);
      m.scale.setScalar(r);
      m.userData.r = r;
      cloud.add(m);
      return m;
    });
    root.add(cloud);

    // lightning bolt in front
    const boltGeo = boltGeometry();
    const boltMat = new THREE.MeshStandardMaterial({
      color: 0x0176d3,
      emissive: 0x1b96ff,
      emissiveIntensity: 0.9,
      roughness: 0.25,
      metalness: 0.3,
    });
    const bolt = new THREE.Mesh(boltGeo, boltMat);
    bolt.position.set(0.05, -0.05, 1.75);
    bolt.rotation.z = -0.08;
    root.add(bolt);

    // orbit ring with moving points
    const orbit = new THREE.Group();
    orbit.rotation.set(1.25, 0.25, 0);
    const ringGeo = new THREE.TorusGeometry(3.1, 0.012, 8, 160);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x57a3fd, transparent: true, opacity: 0.5 });
    orbit.add(new THREE.Mesh(ringGeo, ringMat));
    const dotGeo = new THREE.SphereGeometry(0.11, 20, 16);
    const dotMats = [0x1b96ff, 0x45c65a, 0xaacbff].map(
      (c) => new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.9 }),
    );
    for (let i = 0; i < 6; i++) {
      const d = new THREE.Mesh(dotGeo, dotMats[i % 3]);
      const a = (i / 6) * Math.PI * 2;
      d.position.set(Math.cos(a) * 3.1, Math.sin(a) * 3.1, 0);
      d.scale.setScalar(i % 2 ? 0.7 : 1.15);
      orbit.add(d);
    }
    root.add(orbit);

    // lights
    const hemi = new THREE.HemisphereLight(0xffffff, 0x0b3a7a, 1);
    const key = new THREE.DirectionalLight(0xffffff, 1.9);
    key.position.set(3, 5, 6);
    const blue = new THREE.PointLight(0x1b96ff, 60, 30);
    blue.position.set(-5, -2, 4);
    const green = new THREE.PointLight(0x45c65a, 22, 30);
    green.position.set(5, -3, 3);
    scene.add(hemi, key, blue, green);

    const render = () => renderer.render(scene, camera);

    applyTheme.current = (name) => {
      const look = LOOK[name] || LOOK.dark;
      cloudMat.color.setHex(look.cloud);
      cloudMat.emissive.setHex(look.emissive);
      cloudMat.emissiveIntensity = look.glow;
      haloMat.opacity = look.halo;
      hemi.groundColor.setHex(look.ground);
      hemi.intensity = look.ambient;
      if (!animate) render();
    };

    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // keep the whole orbit in frame on narrow canvases
      camera.position.z = width < height ? 12 * (height / width) * 0.95 : 12;
      camera.updateProjectionMatrix();
      if (!animate) render();
    };

    const pointer = { x: 0, y: 0 };
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    let visible = true;
    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const t = clock.getElapsedTime();
      root.rotation.y += (pointer.x * 0.55 - root.rotation.y) * 0.05;
      root.rotation.x += (pointer.y * 0.28 - root.rotation.x) * 0.05;
      root.position.y = Math.sin(t * 0.8) * 0.16;
      puffs.forEach((m, i) => m.scale.setScalar(m.userData.r * (1 + Math.sin(t * 0.9 + i * 1.3) * 0.035)));
      orbit.rotation.z = t * 0.25;
      bolt.rotation.y = Math.sin(t * 1.1) * 0.35;
      boltMat.emissiveIntensity = 0.8 + Math.sin(t * 3) * 0.25;
      render();
    };

    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    resize();
    applyTheme.current(document.documentElement.dataset.theme);
    render();

    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);
    if (animate) {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      applyTheme.current = null;
      [sphere, boltGeo, ringGeo, dotGeo].forEach((g) => g.dispose());
      [cloudMat, boltMat, ringMat, haloMat, ...dotMats].forEach((m) => m.dispose());
      haloTex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [animate]);

  return <div ref={mount} aria-hidden="true" className="absolute inset-0" />;
}
