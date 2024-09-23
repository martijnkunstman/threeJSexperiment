import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let cones = [];
let directions = [];
let coneCount = 50;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls( camera, renderer.domElement );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//make a cone
for (let i = 0; i < coneCount; i++) {
    const coneGeometry = new THREE.ConeGeometry( 0.2, 1, 8 );
    const coneMaterial = new THREE.MeshPhongMaterial( { color: 0xffff00} );
    cones[i] = new THREE.Mesh( coneGeometry, coneMaterial );
    directions[i] = new THREE.Vector3( Math.random()*2-1, Math.random()*2-1, Math.random()*2-1 );
    scene.add( cones[i] );
}

//make a cube
// const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
// const cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
// const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
// scene.add( cube );

// //add light
const light = new THREE.HemisphereLight( 0xff0000, 0x00ff00, 1 );
scene.add( light );

// add ambient light
const ambientLight = new THREE.AmbientLight( 0x404040, 0.5);
scene.add( ambientLight );

camera.position.z = 5;

function animate() {
    controls.update();

    for (let i = 0; i < coneCount; i++) {
        cones[i].position.x += directions[i].x*0.01;
        cones[i].position.y += directions[i].y*0.01;
        cones[i].position.z += directions[i].z*0.01;
        //rotate cone towards the direction it is moving
        cones[i].lookAt(cones[i].position.clone().add(directions[i]));
        cones[i].rotateX(Math.PI / 2); 
        cones[i].rotateY(Math.PI / 2);
    }

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // cube.position.x = 2;
    // cube.position.y = 2;

	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );