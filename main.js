import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// main scene
const scene = new THREE.Scene();

// shape: sphere - args size width height
const geometry = new THREE.SphereGeometry(3, 64, 64);
// texture
const earthTexture = new THREE.TextureLoader().load("./assets/earth.jpeg");
const material = new THREE.MeshStandardMaterial({
  map: earthTexture,
});

// background
const spaceTexture = new THREE.TextureLoader().load("./assets/space.jpeg");
spaceTexture.wrapS = THREE.RepeatWrapping;
spaceTexture.wrapT = THREE.RepeatWrapping;
// spaceTexture.repeat.set(1, 1);
scene.background = spaceTexture;

// geometry * material
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 10, 10);
scene.add(light);

// size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  2000
);
camera.position.z = 15;
scene.add(camera);

// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGL1Renderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(2);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// resize event listener
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // camera and renderer needs update
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

// rerender the canvas
const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// timeline, scronize animation
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0.5, x: 0.5, y: 0.5 }, { z: 1, x: 1, y: 1 });
tl.fromTo(".spin-text", { opacity: 0 }, { opacity: 1 });
