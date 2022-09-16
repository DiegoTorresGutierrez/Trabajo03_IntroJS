import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(10);
camera.position.setX(-15);

renderer.render(scene, camera);



// Torus (ANILLO DE COLOR)

const geometry = new THREE.TorusGeometry(300, 2, 70, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);







// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

//ESTRELLAS


function addStar() {
  const geometry = new THREE.SphereGeometry(0.75, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(999));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(999).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('Univ.jpg');
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('saturno.jpg');

const jeff = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load('tierra.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);


//Jupiter
const jupiterTexture = new THREE.TextureLoader().load('jupiter.jpg');

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(9, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
    normalMap: normalTexture,
  })
);
scene.add(jupiter);



//ANILLOS DE SATURNO
const SatRINGTexture = new THREE.TextureLoader().load('rings.jpg');

const SatRINGS = new THREE.Mesh(
  new THREE.TorusGeometry(5, 2, 2.3, 100),
  new THREE.MeshStandardMaterial({
    map: SatRINGTexture,
    normalMap: normalTexture,
  })
);

scene.add(SatRINGS);


//Config Tierra
moon.position.z = 200;
moon.position.y = 3;
moon.position.x = 5;
//moon.position.setX(80);


//Config Jupiter
jupiter.position.z = 390;
jupiter.position.y = 3;
jupiter.position.x = -20;




//Avatar Position
jeff.position.z = -5;
jeff.position.x = 2;


SatRINGS.position.z = -5;
SatRINGS.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  //moon.rotation.x += 0.1;
 // moon.rotation.y += 0.075;
 // moon.rotation.z += 0.05;

  //jupiter.rotation.x += 0.1;
 // jupiter.rotation.y += 0.075;
 // jupiter.rotation.z += 0.05;
  

  
  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.1;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.y += 0.05;

  jupiter.rotation.y += 0.05;
  
  SatRINGS.rotation.x += 0.01;
  SatRINGS.rotation.y += 0.005;
  SatRINGS.rotation.y += 0.05;
  // controls.update();

  jeff.rotation.y += 0.05;

  renderer.render(scene, camera);
}

animate();
